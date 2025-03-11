"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class NovaPoshtaClient {
    constructor({ apiKey, senderRef, senderAddressRef, senderCityRef, senderPhone, contactSender, }) {
        this.buildCitiesEndpoints = () => {
            return {
                list: async (name, limit) => {
                    return this.client
                        .post('/', {
                        apiKey: this.apiKey,
                        modelName: 'Address',
                        calledMethod: 'getCities',
                        methodProperties: { FindByString: name, Limit: limit },
                    })
                        .then(({ data }) => data);
                },
            };
        };
        this.buildWarehousesEndpoints = () => {
            return {
                list: async (cityRef, limit) => {
                    return this.client
                        .post('/', {
                        apiKey: this.apiKey,
                        modelName: 'Address',
                        calledMethod: 'getWarehouses',
                        methodProperties: { CityRef: cityRef, Limit: limit },
                    })
                        .then(({ data }) => data);
                },
            };
        };
        this.buildTrackingEndpoints = () => {
            return {
                list: async (documents) => {
                    return this.client
                        .post('/', {
                        apiKey: this.apiKey,
                        modelName: 'TrackingDocument',
                        calledMethod: 'getStatusDocuments',
                        methodProperties: { Documents: documents },
                    })
                        .then(({ data }) => data);
                },
            };
        };
        this.buildInvoiceEndpoints = () => {
            return {
                create: async ({ cost, weight, description, customerFullName, customerPhone, settlementType, cityName, warehouseNumber, width, height, length, volume, }) => {
                    const data = {
                        apiKey: this.apiKey,
                        modelName: 'InternetDocument',
                        calledMethod: 'save',
                        methodProperties: {
                            PayerType: 'Recipient',
                            PaymentMethod: 'Cash',
                            DateTime: new Date().toLocaleDateString('uk'),
                            CargoType: 'Parcel',
                            Weight: weight,
                            ServiceType: 'WarehouseWarehouse',
                            SeatsAmount: '1',
                            Description: description,
                            Cost: cost.toFixed(2),
                            CitySender: this.senderCityRef,
                            Sender: this.senderRef,
                            SenderAddress: this.senderAddressRef,
                            ContactSender: this.contactSender,
                            SendersPhone: this.senderPhone,
                            RecipientsPhone: customerPhone,
                            NewAddress: '1',
                            RecipientCityName: cityName,
                            RecipientArea: '',
                            RecipientAreaRegions: '',
                            RecipientAddressName: warehouseNumber,
                            RecipientHouse: '',
                            RecipientFlat: '',
                            RecipientName: customerFullName,
                            RecipientType: 'PrivatePerson',
                            SettlementType: settlementType,
                            EDRPOU: '',
                            OptionsSeat: [
                                {
                                    volumetricVolume: volume,
                                    volumetricWidth: width,
                                    volumetricLength: length,
                                    volumetricHeight: height,
                                    weight: weight,
                                },
                            ],
                        },
                    };
                    return this.client.post('/', data).then(({ data }) => data);
                },
            };
        };
        this.apiKey = apiKey;
        this.senderRef = senderRef;
        this.senderAddressRef = senderAddressRef;
        this.senderCityRef = senderCityRef;
        this.senderPhone = senderPhone;
        this.contactSender = contactSender;
        this.client = axios_1.default.create({
            baseURL: `https://api.novaposhta.ua/v2.0/json`,
            headers: {
                'content-type': 'application/json',
            },
        });
        this.cities = this.buildCitiesEndpoints();
        this.warehouses = this.buildWarehousesEndpoints();
        this.invoice = this.buildInvoiceEndpoints();
        this.tracking = this.buildTrackingEndpoints();
    }
}
exports.default = NovaPoshtaClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm92YVBvc2h0YUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Ob3ZhUG9zaHRhQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTZDO0FBdUI3QyxNQUFNLGdCQUFnQjtJQXFCcEIsWUFBWSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixXQUFXLEVBQ1gsYUFBYSxHQUNMO1FBb0JWLHlCQUFvQixHQUFHLEdBQUcsRUFBRTtZQUMxQixPQUFPO2dCQUNMLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBWSxFQUFFLEtBQWMsRUFBRSxFQUFFO29CQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNO3lCQUNmLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3dCQUNuQixTQUFTLEVBQUUsU0FBUzt3QkFDcEIsWUFBWSxFQUFFLFdBQVc7d0JBQ3pCLGdCQUFnQixFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO3FCQUN2RCxDQUFDO3lCQUNELElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLDZCQUF3QixHQUFHLEdBQUcsRUFBRTtZQUM5QixPQUFPO2dCQUNMLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBZSxFQUFFLEtBQWMsRUFBRSxFQUFFO29CQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNO3lCQUNmLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3dCQUNuQixTQUFTLEVBQUUsU0FBUzt3QkFDcEIsWUFBWSxFQUFFLGVBQWU7d0JBQzdCLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8s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