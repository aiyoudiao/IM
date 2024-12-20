import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
export class CursorDto {
}
__decorate([
    ApiProperty({ minimum: 0, default: 0 }),
    Min(0),
    IsInt(),
    Expose(),
    IsOptional({ always: true }),
    Transform(({ value: val }) => (val ? Number.parseInt(val) : 0), {
        toClassOnly: true,
    }),
    __metadata("design:type", Number)
], CursorDto.prototype, "cursor", void 0);
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
], CursorDto.prototype, "limit", void 0);
//# sourceMappingURL=cursor.dto.js.map