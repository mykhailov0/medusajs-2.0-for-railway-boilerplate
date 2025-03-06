"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const medusa_core_utils_1 = require("medusa-core-utils");
exports.default = (rootDirectory) => {
    const router = (0, express_1.Router)();
    const { configModule } = (0, medusa_core_utils_1.getConfigFile)(rootDirectory, 'medusa-config');
    const { projectConfig } = configModule;
    const storeCorsOptions = {
        origin: projectConfig.store_cors.split(','),
        credentials: true,
    };
    router.options('/store/np/cities', (0, cors_1.default)(storeCorsOptions));
    router.get('/store/np/cities', (0, cors_1.default)(storeCorsOptions), async (req, res) => {
        const { name, limit } = req.query;
        try {
            const novaPoshtaService = req.scope.resolve('novaposhtaFulfillmentService');
            const cities = await novaPoshtaService.retrieveCities(decodeURIComponent(name), limit ? Number(limit) : undefined);
            res.json(cities);
        }
        catch (error) {
            res.json({ cities: [], error });
        }
    });
    router.options('/store/np/warehouses', (0, cors_1.default)(storeCorsOptions));
    router.get('/store/np/warehouses', (0, cors_1.default)(storeCorsOptions), async (req, res) => {
        const { city, limit } = req.query;
        try {
            const novaPoshtaService = req.scope.resolve('novaposhtaFulfillmentService');
            const droppoints = await novaPoshtaService.retrieveWarehouses(decodeURI(city), limit ? Number(limit) : undefined);
            res.json(droppoints);
        }
        catch (error) {
            res.json({ droppoints: [], error });
        }
    });
    const adminCorsOptions = {
        origin: projectConfig.admin_cors.split(','),
        credentials: true,
    };
    router.options('/admin/np/cities', (0, cors_1.default)(adminCorsOptions));
    router.get('/admin/np/cities', (0, cors_1.default)(adminCorsOptions), async (req, res) => {
        const { name, limit } = req.query;
        try {
            const novaPoshtaService = req.scope.resolve('novaposhtaFulfillmentService');
            const cities = await novaPoshtaService.retrieveCities(decodeURIComponent(name), limit ? Number(limit) : undefined);
            res.json(cities);
        }
        catch (error) {
            res.json({ cities: [], error });
        }
    });
    router.options('/admin/np/warehouses', (0, cors_1.default)(adminCorsOptions));
    router.get('/admin/np/warehouses', (0, cors_1.default)(adminCorsOptions), async (req, res) => {
        const { city, limit } = req.query;
        try {
            const novaPoshtaService = req.scope.resolve('novaposhtaFulfillmentService');
            const droppoints = await novaPoshtaService.retrieveWarehouses(decodeURI(city), limit ? Number(limit) : undefined);
            res.json(droppoints);
        }
        catch (error) {
            res.json({ droppoints: [], error });
        }
    });
    return router;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWlDO0FBQ2pDLGdEQUF3QjtBQUN4Qix5REFBa0Q7QUFHbEQsa0JBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtJQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztJQUV4QixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBQSxpQ0FBYSxFQUNwQyxhQUFhLEVBQ2IsZUFBZSxDQUNoQixDQUFDO0lBQ0YsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLFlBQVksQ0FBQztJQUV2QyxNQUFNLGdCQUFnQixHQUFHO1FBQ3ZCLE1BQU0sRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDM0MsV0FBVyxFQUFFLElBQUk7S0FDbEIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsSUFBQSxjQUFJLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBQSxjQUFJLEVBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3hFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQXdDLENBQUM7UUFFckUsSUFBSTtZQUNGLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ3pDLDhCQUE4QixDQUMvQixDQUFDO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxjQUFjLENBQ25ELGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUN4QixLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENB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