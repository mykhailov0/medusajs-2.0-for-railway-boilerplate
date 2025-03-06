"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudipsp_node_js_sdk_1 = __importDefault(require("cloudipsp-node-js-sdk"));
const medusa_1 = require("@medusajs/medusa");
const uuid_1 = require("uuid");
const convertTemplateToTitle_1 = require("../utils/convertTemplateToTitle");
class FondyPaymentService extends medusa_1.AbstractPaymentService {
    constructor({ cartService, logger }, options) {
        super({ cartService, logger }, options);
        this.cartService = cartService;
        this.options = options;
        this.logger = logger;
        if (!this.options.merchantId)
            this.logger.warn("Missing merchantId for Fondy plugin");
        if (!this.options.secretKey)
            this.logger.warn("Missing secretKey for Fondy plugin");
        if (!this.options.serverCallbackUrl)
            this.logger.warn("Missing serverCallbackUrl for Fondy plugin");
        if (!this.options.responseUrl)
            this.logger.warn("Missing responseUrl for Fondy plugin");
        if (!this.options.defaultFiscalTitleTemplate)
            this.logger.warn("Missing defaultFiscalTitleTemplate for Fondy plugin");
        this.fondyClient = new cloudipsp_node_js_sdk_1.default({
            merchantId: this.options.merchantId || 1396424,
            secretKey: this.options.secretKey || "test"
        });
    }
    async getPaymentData(paymentSession) {
        return { ...paymentSession.data };
    }
    async updatePaymentData(paymentSessionData, data) {
        if (data.orderStatus === "approved" && data.signature && data.paymentId) {
            const result = await this.getPaymentDetails(data.orderId, data.signature);
            if (result.response_status === "success" && result.order_status === "approved")
                return {
                    orderId: data.orderId,
                    orderStatus: data.orderStatus,
                    signature: data.signature,
                    paymentId: data.paymentId
                };
        }
        return { ...paymentSessionData, ...data };
    }
    // @ts-ignore
    async createPayment(cart) {
        return { cartId: cart.id };
    }
    async retrievePayment(paymentData) {
        return paymentData;
    }
    async updatePayment(paymentSessionData, cart) {
        var _a;
        const items = cart.items.map(item => ({ id: item.id, quantity: item.quantity }));
        let data = paymentSessionData;
        if (paymentSessionData.orderStatus === "redirect") {
            const hasChanges = items.length !== ((_a = paymentSessionData.items) === null || _a === void 0 ? void 0 : _a.length)
                || !items.every(({ id, quantity }, index) => {
                    const oldItem = paymentSessionData.items[index];
                    return id === oldItem.id && quantity === oldItem.quantity;
                });
            if (hasChanges) {
                data = { cartId: paymentSessionData.cartId };
            }
        }
        return { ...data, items };
    }
    async authorizePayment(paymentSession, context) {
        const sessionData = paymentSession.data;
        const status = await this.getStatus(sessionData);
        if (sessionData.orderStatus === "redirect") {
            return { data: sessionData, status: medusa_1.PaymentSessionStatus.REQUIRES_MORE };
        }
        if (status === medusa_1.PaymentSessionStatus.AUTHORIZED) {
            return { data: sessionData, status: medusa_1.PaymentSessionStatus.AUTHORIZED };
        }
        const data = await this.createPaymentUrl(paymentSession.cart_id);
        if (data.isSuccess) {
            return {
                status: medusa_1.PaymentSessionStatus.PENDING,
                data: { ...sessionData, checkoutUrl: data.checkoutUrl, orderId: data.orderId, orderStatus: "redirect" }
            };
        }
        return {
            status: medusa_1.PaymentSessionStatus.ERROR,
            data: { errorCode: data.errorCode, errorMessage: data.errorMessage, orderStatus: "error" }
        };
    }
    async capturePayment(payment) {
        const { signature, orderId } = payment.data;
        const status = await this.getPaymentDetails(orderId, signature);
        const captureData = {
            currency: status.actual_currency,
            amount: status.actual_amount,
            order_id: orderId
        };
        const response = await this.fondyClient.Capture(captureData);
        if (response.capture_status === "captured") {
            return { ...payment.data, orderStatus: "captured" };
        }
        throw new Error(`Cannot capture order: ${status.order_id}`);
    }
    async refundPayment(payment, refundAmount) {
        const { signature, orderId } = payment.data;
        const status = await this.getPaymentDetails(orderId, signature);
        const reverseData = {
            currency: status.currency,
            amount: refundAmount,
            order_id: orderId
        };
        const response = await this.fondyClient.Reverse(reverseData);
        if (response.reverse_status !== "declined") {
            return { ...payment.data, orderStatus: "refunded" };
        }
        throw new Error(`Cannot refund order: ${status.order_id}`);
    }
    async cancelPayment(payment) {
        const { signature, orderId } = payment.data;
        const status = await this.getPaymentDetails(orderId, signature);
        const additionalInfo = JSON.parse(status.additional_info);
        if (additionalInfo.capture_status === "hold") {
            const reverseData = {
                currency: status.currency,
                amount: status.amount,
                order_id: orderId
            };
            const response = await this.fondyClient.Reverse(reverseData);
            if (response.reverse_status !== "declined") {
                return { ...payment.data, status: "canceled" };
            }
        }
        throw new Error("Cannot cancel already payed order");
    }
    async deletePayment(paymentSession) {
    }
    async getStatus(data) {
        const { orderStatus } = data;
        switch (orderStatus) {
            case "created":
            case "processing":
            case "redirect":
                return medusa_1.PaymentSessionStatus.REQUIRES_MORE;
            case "expired":
                return medusa_1.PaymentSessionStatus.CANCELED;
            case "approved":
                return medusa_1.PaymentSessionStatus.AUTHORIZED;
            case "declined":
                return medusa_1.PaymentSessionStatus.ERROR;
            default:
                return medusa_1.PaymentSessionStatus.REQUIRES_MORE;
        }
    }
    async createPaymentUrl(cartId) {
        const orderId = (0, uuid_1.v4)();
        const cart = await this.cartService.retrieveWithTotals(cartId, {
            relations: ["region", "items.variant.product", "items.variant.product.options"]
        });
        const currency = cart.region.currency_code.toUpperCase();
        const amount = cart.total;
        const products = cart.items.map((item, index) => ({
            "id": index + 1,
            "name": (0, convertTemplateToTitle_1.convertTemplateToTitle)(item.variant.product.fiscal_title_template || this.options.defaultFiscalTitleTemplate || item.title, item.variant, item.variant.product),
            "price": item.unit_price / 100,
            "total_amount": (item.unit_price * item.quantity) / 100,
            "quantity": item.quantity
        }));
        let reservation_data = Buffer.from(JSON.stringify({ products })).toString("base64");
        const requestData = {
            order_id: orderId,
            order_desc: `№: ${cartId.split('_')[1]}`,
            currency,
            amount,
            server_callback_url: this.options.serverCallbackUrl,
            response_url: this.options.responseUrl,
            reservation_data,
            product_id: cartId,
            preauth: "Y"
        };
        if ((cart === null || cart === void 0 ? void 0 : cart.type) !== 'draft_order' || ((cart === null || cart === void 0 ? void 0 : cart.type) === 'draft_order' && !this.options.skipEmailForDraftOrders)) {
            requestData.sender_email = cart.email;
        }
        const data = await this.fondyClient.Checkout(requestData);
        return {
            orderId,
            isSuccess: data.response_status === "success",
            checkoutUrl: data.checkout_url,
            errorMessage: data.error_message,
            errorCode: data.error_code
        };
    }
    async getPaymentDetails(orderId, signature) {
        const requestData = {
            order_id: orderId,
            signature
        };
        return this.fondyClient.Status(requestData);
    }
    createPaymentNew() {
        return Promise.resolve(undefined);
    }
    updatePaymentNew() {
        return Promise.resolve(undefined);
    }
}
FondyPaymentService.identifier = "fondy";
exports.default = FondyPaymentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9uZHktcGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9mb25keS1wYXltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQThDO0FBQzlDLDZDQVMwQjtBQUMxQiwrQkFBZ0M7QUFDaEMsNEVBQXVFO0FBV3ZFLE1BQU0sbUJBQW9CLFNBQVEsK0JBQXNCO0lBU3BELFlBQVksRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBZ0I7UUFDL0MsS0FBSyxDQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMsQ0FBQztR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