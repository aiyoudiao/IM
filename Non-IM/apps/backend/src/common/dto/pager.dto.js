import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Allow, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (Order = {}));
export class PagerDto {
}
__decorate([
    ApiProperty({ minimum: 1, default: 1 }),
    Min(1),
    IsInt(),
    Expose(),
    IsOptional({ always: true }),
    Transform(({ value: val }) => (val ? Number.parseInt(val) : 1), {
        toClassOnly: true,
    }),
    __metadata("design:type", Number)
], PagerDto.prototype, "page", void 0);
__decorate([
    ApiProperty({ minimum: 1, maximum: 100, default: 10 }),
    Min(1),
    Max(100),
    IsInt(),
    IsOptional({ always: true }),
    Expose(),
    Transform(({ value: val }) => (val ? Number.parseInt(val) : 10), {
        toClassOnly: true,
    }),
    __metadata("design:type", Number)
], PagerDto.prototype, "pageSize", void 0);
__decorate([
    ApiProperty(),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PagerDto.prototype, "field", void 0);
__decorate([
    ApiProperty({ enum: Order }),
    IsEnum(Order),
    IsOptional(),
    Transform(({ value }) => (value === 'asc' ? Order.ASC : Order.DESC)),
    __metadata("design:type", String)
], PagerDto.prototype, "order", void 0);
__decorate([
    Allow(),
    __metadata("design:type", Number)
], PagerDto.prototype, "_t", void 0);
//# sourceMappingURL=pager.dto.js.map