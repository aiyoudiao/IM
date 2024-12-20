import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
import { IsUnique } from '~/shared/database/constraints/unique.constraint';
import { ParamConfigEntity } from './param-config.entity';
export class ParamConfigDto {
}
__decorate([
    ApiProperty({ description: '参数名称' }),
    IsString(),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '参数键名' }),
    IsUnique({ entity: ParamConfigEntity, message: '该键名已存在' }),
    IsString(),
    MinLength(3),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "key", void 0);
__decorate([
    ApiProperty({ description: '参数值' }),
    IsString(),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "value", void 0);
__decorate([
    ApiProperty({ description: '备注' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "remark", void 0);
export class ParamConfigQueryDto extends PagerDto {
}
__decorate([
    ApiProperty({ description: '参数名称' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], ParamConfigQueryDto.prototype, "name", void 0);
//# sourceMappingURL=param-config.dto.js.map