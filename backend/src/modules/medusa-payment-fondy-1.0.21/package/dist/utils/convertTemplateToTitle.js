"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTemplateToTitle = void 0;
const convertTemplateToTitle = (template = '', variant, product) => {
    var _a;
    const title = product.options.reduce((acc, option) => {
        var _a;
        const variantOption = (_a = variant.options) === null || _a === void 0 ? void 0 : _a.find((v) => v.option_id === option.id);
        if (variantOption) {
            return acc === null || acc === void 0 ? void 0 : acc.replace(`{{${option.title}}}`, variantOption.value);
        }
        return acc;
    }, template);
    return (_a = title === null || title === void 0 ? void 0 : title.replace('{{sku}}', variant.sku)) === null || _a === void 0 ? void 0 : _a.replace('{{title}}', product.title);
};
exports.convertTemplateToTitle = convertTemplateToTitle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydFRlbXBsYXRlVG9UaXRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb252ZXJ0VGVtcGxhdGVUb1RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFLE9BQXVCLEVBQUUsT0FBZ0IsRUFBRSxFQUFFOztJQUMvRixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTs7UUFDakQsTUFBTSxhQUFhLEdBQUcsTUFBQSxPQUFPLENBQUMsT0FBTywwQ0FBRSxJQUFJLENBQ3ZDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQ25DLENBQUM7UUFDRixJQUFJLGFBQWEsRUFBRTtZQUNmLE9BQU8sR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sQ0FDZixLQUFLLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFDckIsYUFBYSxDQUFDLEtBQUssQ0FDdEIsQ0FBQztTQUNMO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFYixPQUFPLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN0RixDQUFDLENBQUE7QUFmWSxRQUFBLHNCQUFzQiwwQkFlbEMifQ==