import { __decorate, __metadata } from "tslib";
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
import { DictItemEntity } from './dict-item.entity';
export class DictItemDto extends PartialType(DictItemEntity) {
}
__decorate([
    ApiProperty({ description: '字典类型 ID' }),
    IsInt(),
    __metadata("design:type", Number)
], DictItemDto.prototype, "typeId", void 0);
__decorate([
    ApiProperty({ description: '字典项键名' }),
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], DictItemDto.prototype, "label", void 0);
__decorate([
    ApiProperty({ description: '字典项值' }),
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], DictItemDto.prototype, "value", void 0);
__decorate([
    ApiProperty({ description: '状态' }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], DictItemDto.prototype, "status", void 0);
__decorate([
    ApiProperty({ description: '备注' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], DictItemDto.prototype, "remark", void 0);
export class DictItemQueryDto extends PagerDto {
}
__decorate([
    ApiProperty({ description: '字典类型 ID', required: true }),
    IsInt(),
    __metadata("design:type", Number)
], DictItemQueryDto.prototype, "typeId", void 0);
__decorate([
    ApiProperty({ description: '字典项键名' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DictItemQueryDto.prototype, "label", void 0);
__decorate([
    ApiProperty({ description: '字典项值' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DictItemQueryDto.prototype, "value", void 0);
//# sourceMappingURL=dict-item.dto.js.map