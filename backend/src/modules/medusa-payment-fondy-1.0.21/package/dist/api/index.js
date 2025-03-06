"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const medusa_core_utils_1 = require("medusa-core-utils");
const medusa_1 = require("@medusajs/medusa");
const update_product_1 = require("@medusajs/medusa/dist/api/routes/admin/products/update-product");
const class_validator_1 = require("class-validator");
const bodyParser = require('body-parser');
const cloudflare = require('cloudflare-express');
const medusa_core_utils_2 = require("medusa-core-utils");
const fondyServerIps = ['54.76.178.89', '54.154.216.60'];
const fondyUserAgent = 'Mozilla/5.0 (X11; Linux x86_64; Twisted) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36';
exports.default = (rootDirectory) => {
    const router = (0, express_1.Router)();
    router.use(cloudflare.restore({ update_on_start: true }));
    const { configModule } = (0, medusa_core_utils_2.getConfigFile)(rootDirectory, 'medusa-config');
    const { projectConfig } = configModule;
    const adminCorsOptions = {
        origin: projectConfig.admin_cors.split(','),
        credentials: true,
    };
    router.post("/fondy-callback", bodyParser.json(), async (req, res) => {
        var _a;
        if (!fondyServerIps.includes(req.cf_ip) || req.get('User-Agent') !== fondyUserAgent) {
            res.status(401);
            return res.send('Permission denied');
        }
        const body = req.body;
        if (!body.order_id) {
            res.sendStatus(404);
            return;
        }
        const fondyPaymentService = req.scope.resolve("fondyPaymentService");
        const data = await fondyPaymentService.getPaymentDetails(body.order_id, body.signature);
        if (!data.order_id) {
            res.sendStatus(404);
            return;
        }
        if (data.response_status !== 'success' || data.response_code) {
            console.warn(`Fondy payment ${data.order_id} failed with code ${data.response_code}, ${data.response_description}`);
            res.sendStatus(200);
            return;
        }
        const manager = req.scope.resolve("manager");
        const cartService = req.scope.resolve("cartService");
        const orderService = req.scope.resolve("orderService");
        const cartId = data.product_id;
        const order = await orderService
            .retrieveByCartId(cartId)
            .catch((_) => undefined);
        if (!order) {
            await cartService
                .withTransaction(manager)
                .updatePaymentSession(cartId, {
                orderStatus: data.order_status,
                signature: data.signature,
                paymentId: data.payment_id,
                orderId: data.order_id
            });
            const completionStrategy = req.scope.resolve("cartCompletionStrategy");
            const idempotencyKeyService = req.scope.resolve("idempotencyKeyService");
            let idempotencyKey;
            try {
                idempotencyKey = await idempotencyKeyService
                    .withTransaction(manager)
                    .initializeRequest("", "post", { cart_id: cartId }, "/fondy-callback");
            }
            catch (error) {
                throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.UNEXPECTED_STATE, "Failed to create idempotency key", "409");
            }
            const cart = await cartService
                .withTransaction(manager)
                .retrieve(cartId, { select: ["context"] });
            const { response_code, response_body } = await completionStrategy.complete(cartId, idempotencyKey, { ip: (_a = cart.context) === null || _a === void 0 ? void 0 : _a.ip });
            if (response_code !== 200) {
                throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.UNEXPECTED_STATE, response_body["message"], response_body["code"].toString());
            }
        }
        res.sendStatus(200);
    });
    router.get('/admin/product-default-fiscal-title-template', (0, cors_1.default)(adminCorsOptions), async (req, res) => {
        const fondyPaymentService = req.scope.resolve("fondyPaymentService");
        res.json({
            fiscal_title_template: fondyPaymentService.options.defaultFiscalTitleTemplate
        });
    });
    return router;
};
class AdminPostProductsProductReq extends update_product_1.AdminPostProductsProductReq {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminPostProductsProductReq.prototype, "fiscal_title_template", void 0);
(0, medusa_1.registerOverriddenValidators)(AdminPostProductsProductReq);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQThCO0FBSzlCLGdEQUF3QjtBQUN4Qix5REFBNkM7QUFDN0MsNkNBQWdFO0FBQ2hFLG1HQUFrSjtBQUNsSixxREFBdUQ7QUFDdkQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2pELHlEQUFrRDtBQUVsRCxNQUFNLGNBQWMsR0FBRyxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN6RCxNQUFNLGNBQWMsR0FBRyxvSEFBb0gsQ0FBQztBQUU1SSxrQkFBZSxDQUFDLGFBQXFCLEVBQU8sRUFBRTtJQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQTtJQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBQyxlQUFlLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhELE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFBLGlDQUFhLEVBQ2xDLGFBQWEsRUFDYixlQUFlLENBQ2xCLENBQUM7SUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsWUFBWSxDQUFDO0lBRXZDLE1BQU0sZ0JBQWdCLEdBQUc7UUFDckIsTUFBTSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUMzQyxXQUFXLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRTs7UUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxR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