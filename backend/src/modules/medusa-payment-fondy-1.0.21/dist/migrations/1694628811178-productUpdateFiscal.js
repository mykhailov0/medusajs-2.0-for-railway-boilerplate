"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductUpdateFiscal1694628811178 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "product"' + ' ADD COLUMN "fiscal_title_template" text');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "product" DROP COLUMN "fiscal_title_template"');
    }
}
exports.default = ProductUpdateFiscal1694628811178;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTY5NDYyODgxMTE3OC1wcm9kdWN0VXBkYXRlRmlzY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZ3JhdGlvbnMvMTY5NDYyODgxMTE3OC1wcm9kdWN0VXBkYXRlRmlzY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxnQ0FBZ0M7SUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUF3QjtRQUN0QyxNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQ3JCLHVCQUF1QixHQUFHLDBDQUEwQyxDQUNyRSxDQUFDO0lBQ0osQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBd0I7UUFDeEMsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUNyQiwyREFBMkQsQ0FDNUQsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVELGtCQUFlLGdDQUFnQyxDQUFDIn0=