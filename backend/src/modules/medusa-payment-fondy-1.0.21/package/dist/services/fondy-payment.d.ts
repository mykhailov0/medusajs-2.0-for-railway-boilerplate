import CloudIpsp from "cloudipsp-node-js-sdk";
import { AbstractPaymentService, Cart, Data, Payment, PaymentSession, PaymentSessionStatus, CartService, PaymentSessionData } from "@medusajs/medusa";
type Options = {
    merchantId: string;
    secretKey: string;
    serverCallbackUrl: string;
    responseUrl: string;
    skipEmailForDraftOrders?: boolean;
    defaultFiscalTitleTemplate: string;
};
declare class FondyPaymentService extends AbstractPaymentService {
    protected manager_: any;
    protected transactionManager_: any;
    static identifier: string;
    cartService: CartService;
    options: Options;
    fondyClient: CloudIpsp;
    logger: any;
    constructor({ cartService, logger }: {
        cartService: any;
        logger: any;
    }, options: Options);
    getPaymentData(paymentSession: PaymentSession): Promise<Data>;
    updatePaymentData(paymentSessionData: Data, data: Data): Promise<Data>;
    createPayment(cart: Cart): Promise<Data>;
    retrievePayment(paymentData: Data): Promise<Data>;
    updatePayment(paymentSessionData: Data, cart: Cart): Promise<Data>;
    authorizePayment(paymentSession: PaymentSession, context: Data): Promise<{
        data: Data;
        status: PaymentSessionStatus;
    }>;
    capturePayment(payment: Payment): Promise<Data>;
    refundPayment(payment: Payment, refundAmount: number): Promise<Data>;
    cancelPayment(payment: Payment): Promise<Data>;
    deletePayment(paymentSession: PaymentSession): Promise<void>;
    getStatus(data: Data): Promise<PaymentSessionStatus>;
    createPaymentUrl(cartId: string): Promise<{
        orderId: any;
        isSuccess: boolean;
        checkoutUrl: any;
        errorMessage: any;
        errorCode: any;
    }>;
    getPaymentDetails(orderId: any, signature: any): Promise<any>;
    createPaymentNew(): Promise<PaymentSessionData>;
    updatePaymentNew(): Promise<PaymentSessionData>;
}
export default FondyPaymentService;
