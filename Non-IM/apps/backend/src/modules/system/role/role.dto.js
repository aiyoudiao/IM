import { __decorate, __metadata } from "tslib";
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString, Matches, MinLength, } from 'class-validator';
import { OperatorDto } from '~/common/dto/operator.dto';
import { PagerDto } from '~/common/dto/pager.dto';
import { IsUnique } from '~/shared/database/constraints/unique.constraint';
import { RoleEntity } from './role.entity';
export class RoleDto extends OperatorDto {
}
__decorate([
    ApiProperty({ description: '角色名称' }),
    IsString(),
    MinLength(2, { message: '角色名称长度不能小于2' }),
    __metadata("design:type", String)
], RoleDto.prototype, "name", void 0);
__decorate([
    IsUnique({ entity: RoleEntity }),
    ApiProperty({ description: '角色标识' }),
    IsString(),
    Matches(/^[a-z0-9]+$/i, { message: '角色值只能包含字母和数字' }),
    MinLength(2, { message: '角色值长度不能小于2' }),
    __metadata("design:type", String)
], RoleDto.prototype, "value", void 0);
__decorate([
    ApiProperty({ description: '角色备注' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RoleDto.prototype, "remark", void 0);
__decorate([
    ApiProperty({ description: '状态' }),
    IsIn([0, 1]),
    __metadata("design:type", Number)
], RoleDto.prototype, "status", void 0);
__decorate([
    ApiProperty({ description: '关联菜单、权限编号' }),
    IsOptional(),
    IsArray(),
    __metadata("design:type", Array)
], RoleDto.prototype, "menuIds", void 0);
export class RoleUpdateDto extends PartialType(RoleDto) {
}
export class RoleQueryDto extends IntersectionType((PagerDto), PartialType(RoleDto)) {
}
__decorate([
    ApiProperty({ description: '角色名称', required: false }),
    IsString(),
    __metadata("design:type", String)
], RoleQueryDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '角色值', required: false }),
    IsString(),
    __metadata("design:type", String)
], RoleQueryDto.prototype, "value", void 0);
//# sourceMappingURL=role.dto.js.map