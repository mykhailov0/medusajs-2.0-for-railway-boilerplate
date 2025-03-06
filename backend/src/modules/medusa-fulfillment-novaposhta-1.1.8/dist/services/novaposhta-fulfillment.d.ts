import { FulfillmentService } from 'medusa-interfaces';
import { Fulfillment, LineItem, Logger, Order } from '@medusajs/medusa';
import NovaPoshtaClient, { TrackingDocument } from '../utils/NovaPoshtaClient';
type CreateFulfillmentData = {
    city: {
        title: string;
        settlementType: string;
    };
    warehouse: {
        title: string;
        number: string;
    };
    options?: {
        description: string;
        weight: string;
        width: string;
        length: string;
        height: string;
        volume: string;
    };
};
export type Options = {
    apiKey: string;
    senderRef: string;
    senderCityRef: string;
    senderAddressRef: string;
    contactSender: string;
    senderPhone: string;
};
declare class NovaposhtaFulfillmentService extends FulfillmentService {
    static identifier: string;
    logger: Logger;
    options: Options;
    client: NovaPoshtaClient;
    constructor({ logger }: {
        logger: any;
    }, options: Options);
    getFulfillmentOptions(): {
        id: string;
    }[];
    validateOption(): boolean;
    validateFulfillmentData(data: object, cart: object): {};
    canCalculate(): boolean;
    calculatePrice(): void;
    createOrder(): Promise<{}>;
    createReturn(): Promise<{}>;
    createFulfillment(methodData: CreateFulfillmentData, fulfillmentItems: LineItem[], fromOrder: Order, fulfillment: Fulfillment): Promise<{
        data: any;
        errors: any;
    }>;
    cancelFulfillment(): Promise<{}>;
    retrieveCities(name: string, limit?: number): Promise<any>;
    retrieveWarehouses(cityRef: string, limit?: number): Promise<any>;
    trackDocuments(documents: TrackingDocument[]): Promise<any>;
}
export default NovaposhtaFulfillmentService;
