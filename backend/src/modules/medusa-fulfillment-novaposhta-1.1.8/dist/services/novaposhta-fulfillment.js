"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_interfaces_1 = require("medusa-interfaces");
const NovaPoshtaClient_1 = __importDefault(require("../utils/NovaPoshtaClient"));
class NovaposhtaFulfillmentService extends medusa_interfaces_1.FulfillmentService {
    constructor({ logger }, options) {
        super();
        this.logger = logger;
        this.options = options;
        if (!this.options.apiKey) {
            this.logger.warn('Missing api_key for NovaPoshta plugin');
        }
        if (!this.options.senderRef) {
            this.logger.warn('Missing senderRef for NovaPoshta plugin');
        }
        if (!this.options.senderCityRef) {
            this.logger.warn('Missing senderCityRef for NovaPoshta plugin');
        }
        if (!this.options.senderAddressRef) {
            this.logger.warn('Missing senderAddressRef for NovaPoshta plugin');
        }
        if (!this.options.contactSender) {
            this.logger.warn('Missing contactSender for NovaPoshta plugin');
        }
        if (!this.options.senderPhone) {
            this.logger.warn('Missing senderPhone for NovaPoshta plugin');
        }
        this.client = new NovaPoshtaClient_1.default(this.options);
    }
    getFulfillmentOptions() {
        return [
            {
                id: 'Standard',
            },
        ];
    }
    validateOption() {
        return true;
    }
    validateFulfillmentData(data, cart) {
        return { ...data, ...cart };
    }
    canCalculate() {
        return false;
    }
    calculatePrice() {
        throw Error('NovaPoshta Fulfillment service cannot calculatePrice');
    }
    createOrder() {
        return Promise.resolve({});
    }
    createReturn() {
        return Promise.resolve({});
    }
    async createFulfillment(methodData, fulfillmentItems, fromOrder, fulfillment) {
        var _a, _b, _c, _d, _e, _f;
        const { data, errors } = await this.client.invoice.create({
            cityName: methodData.city.title,
            customerPhone: fromOrder.shipping_address.phone,
            customerFullName: `${fromOrder.shipping_address.last_name} ${fromOrder.shipping_address.first_name}`,
            cost: fulfillmentItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0) / 100,
            description: (_a = methodData.options) === null || _a === void 0 ? void 0 : _a.description,
            weight: (_b = methodData.options) === null || _b === void 0 ? void 0 : _b.weight,
            settlementType: methodData.city.settlementType,
            warehouseNumber: methodData.warehouse.number,
            width: (_c = methodData.options) === null || _c === void 0 ? void 0 : _c.width,
            length: (_d = methodData.options) === null || _d === void 0 ? void 0 : _d.length,
            height: (_e = methodData.options) === null || _e === void 0 ? void 0 : _e.height,
            volume: (_f = methodData.options) === null || _f === void 0 ? void 0 : _f.volume,
        });
        return { data, errors };
    }
    cancelFulfillment() {
        return Promise.resolve({});
    }
    async retrieveCities(name, limit) {
        return this.client.cities.list(name, limit);
    }
    async retrieveWarehouses(cityRef, limit) {
        return this.client.warehouses.list(cityRef, limit);
    }
    async trackDocuments(documents) {
        return this.client.tracking.list(documents);
    }
}
NovaposhtaFulfillmentService.identifier = 'novaposhta';
exports.default = NovaposhtaFulfillmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92YXBvc2h0YS1mdWxmaWxsbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ub3ZhcG9zaHRhLWZ1bGZpbGxtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseURBQXVEO0FBRXZELGlGQUErRTtBQThCL0UsTUFBTSw0QkFBNkIsU0FBUSxzQ0FBa0I7SUFPM0QsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQWdCO1FBQ3RDLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNwRTtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxF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