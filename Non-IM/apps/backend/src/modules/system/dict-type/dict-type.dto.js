import { __decorate, __metadata } from "tslib";
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
import { IsUnique } from '~/shared/database/constraints/unique.constraint';
import { DictTypeEntity } from './dict-type.entity';
export class DictTypeDto extends PartialType(DictTypeEntity) {
}
__decorate([
    ApiProperty({ description: '字典类型名称' }),
    IsUnique({ entity: DictTypeEntity, message: '已存在相同名称的字典' }),
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], DictTypeDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '字典类型code' }),
    IsUnique({ entity: DictTypeEntity, message: '已存在相同编码的字典' }),
    IsString(),
    MinLength(3),
    __metadata("design:type", String)
], DictTypeDto.prototype, "code", void 0);
__decorate([
    ApiProperty({ description: '状态' }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], DictTypeDto.prototype, "status", void 0);
__decorate([
    ApiProperty({ description: '备注' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], DictTypeDto.prototype, "remark", void 0);
export class DictTypeQueryDto extends PagerDto {
}
__decorate([
    ApiProperty({ description: '字典类型名称' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DictTypeQueryDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '字典类型code' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DictTypeQueryDto.prototype, "code", void 0);
//# sourceMappingURL=dict-type.dto.js.map