import { AxiosInstance } from 'axios';
import { Options } from '../services/novaposhta-fulfillment';
type CreateInvoice = {
    cost: number;
    weight: string;
    description: string;
    customerFullName: string;
    customerPhone: string;
    settlementType: string;
    cityName: string;
    warehouseNumber: string;
    width: string;
    height: string;
    length: string;
    volume: string;
};
export type TrackingDocument = {
    DocumentNumber: string;
    Phone: string;
};
declare class NovaPoshtaClient {
    apiKey: string;
    senderRef: string;
    senderAddressRef: string;
    senderCityRef: string;
    senderPhone: string;
    contactSender: string;
    client: AxiosInstance;
    cities: {
        list: (name: string, limit?: number) => Promise<any>;
    };
    warehouses: {
        list: (name: string, limit?: number) => Promise<any>;
    };
    invoice: {
        create: (options: CreateInvoice) => Promise<any>;
    };
    tracking: {
        list: (documents: TrackingDocument[]) => Promise<any>;
    };
    constructor({ apiKey, senderRef, senderAddressRef, senderCityRef, senderPhone, contactSender, }: Options);
    buildCitiesEndpoints: () => {
        list: (name: string, limit?: number) => Promise<any>;
    };
    buildWarehousesEndpoints: () => {
        list: (cityRef: string, limit?: number) => Promise<any>;
    };
    buildTrackingEndpoints: () => {
        list: (documents: TrackingDocument[]) => Promise<any>;
    };
    buildInvoiceEndpoints: () => {
        create: ({ cost, weight, description, customerFullName, customerPhone, settlementType, cityName, warehouseNumber, width, height, length, volume, }: CreateInvoice) => Promise<any>;
    };
}
export default NovaPoshtaClient;
