"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const novaPoshtaShippedJob = async (container) => {
    const jobSchedulerService = container.resolve('jobSchedulerService');
    jobSchedulerService.create('nova-poshta-shipped', {}, '0 21 * * *', async () => {
        const logger = container.resolve('logger');
        try {
            const orderService = container.resolve('orderService');
            const manager = container.resolve('manager');
            const fulfilledOrders = await orderService.list({
                fulfillment_status: 'fulfilled',
            }, { relations: ['fulfillments', 'shipping_address'] });
            const { novaPoshtaTrackingDocuments, orders } = fulfilledOrders.reduce((acc, order) => {
                const phone = order.shipping_address.phone;
                const fulfillments = order.fulfillments.filter((fulfillment) => {
                    var _a, _b;
                    return !fulfillment.canceled_at &&
                        !fulfillment.shipped_at &&
                        !((_b = (_a = fulfillment.data) === null || _a === void 0 ? void 0 : _a.errors) === null || _b === void 0 ? void 0 : _b.length);
                });
                acc.orders.push(...fulfillments.map((fulfillment) => {
                    var _a, _b;
                    return ({
                        orderId: order.id,
                        fulfillmentId: fulfillment.id,
                        trackingNumber: (_b = (_a = fulfillment.data.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.IntDocNumber,
                    });
                }));
                acc.novaPoshtaTrackingDocuments.push(...fulfillments.map((fulfillment) => {
                    var _a, _b;
                    return ({
                        DocumentNumber: (_b = (_a = fulfillment.data.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.IntDocNumber,
                        Phone: phone,
                    });
                }));
                return acc;
            }, { novaPoshtaTrackingDocuments: [], orders: [] });
            if (!novaPoshtaTrackingDocuments.length) {
                logger.info('Nova Poshta Job - no new fulfilled orders');
                return;
            }
            const novaPoshtaService = container.resolve('novaposhtaFulfillmentService');
            const responses = await Promise.all(splitArray(novaPoshtaTrackingDocuments, 100).map((items) => novaPoshtaService.trackDocuments(items)));
            const { data, errors } = responses.reduce((acc, response) => {
                acc.data.push(...response.data);
                acc.errors.push(...response.errors);
                return acc;
            }, { data: [], errors: [] });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                logger.error(`Nova Poshta Job - ${errors.toString()}`);
            }
            const shippedDocuments = data.filter((document) => Number(document.StatusCode) > 3);
            await Promise.all(shippedDocuments.map((document) => {
                const order = orders.find((order) => order.trackingNumber === document.Number);
                if (!order) {
                    return;
                }
                const { orderId, fulfillmentId, trackingNumber } = order;
                return manager.transaction(async (transactionManager) => {
                    return await orderService
                        .withTransaction(transactionManager)
                        .createShipment(orderId, fulfillmentId, [{ tracking_number: trackingNumber }], {
                        metadata: {},
                        no_notification: true,
                    });
                });
            }));
            logger.info(`Nova Poshta Job - ${shippedDocuments.length} orders shipped`);
        }
        catch (error) {
            logger.error(error);
        }
    });
};
function splitArray(array, pairSize) {
    const arrayPairs = [];
    for (let i = 0; i < array.length; i += pairSize) {
        const pair = array.slice(i, i + pairSize);
        arrayPairs.push(pair);
    }
    return arrayPairs;
}
exports.default = novaPoshtaShippedJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92YS1wb3NodGEtc2hpcHBlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2FkZXJzL25vdmEtcG9zaHRhLXNoaXBwZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVQSxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFBRSxTQUEwQixFQUFFLEVBQUU7SUFDaEUsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFckUsbUJBQW1CLENBQUMsTUFBTSxDQUN4QixxQkFBcUIsRUFDckIsRUFBRSxFQUNGLFlBQVksRUFDWixLQUFLLElBQUksRUFBRTtRQUNULE1BQU0sTUFBTSxHQUFXLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSTtZQUNGLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdkQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QyxNQUFNLGVBQWUsR0FBWSxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQ3REO2dCQUNFLGtCQUFrQixFQUFFLFdBQVc7YUFDaEMsRUFDRCxFQUFFLFNBQVMsRUFBRSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLENBQ3BELENBQUM7WUFDRixNQUFNLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxFQUFFLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FDcEUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2IsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztnQkFDM0MsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQzVDLENBQUMsV0FBd0IsRUFBRSxFQUFFOztvQkFDM0IsT0FBQSxDQUFDLFdBQVcsQ0FBQyxXQUFXO3dCQUN4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