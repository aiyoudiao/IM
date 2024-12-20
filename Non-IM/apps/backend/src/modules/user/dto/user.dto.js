import { __decorate, __metadata } from "tslib";
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsEmail, IsIn, IsInt, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateIf, } from 'class-validator';
import { isEmpty } from 'lodash';
import { PagerDto } from '~/common/dto/pager.dto';
export class UserDto {
}
__decorate([
    ApiProperty({ description: '头像' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "avatar", void 0);
__decorate([
    ApiProperty({ description: '登录账号', example: 'admin' }),
    IsString(),
    Matches(/^[\s\S]+$/),
    MinLength(4),
    MaxLength(20),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '登录密码', example: 'a123456' }),
    IsOptional(),
    Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i, {
        message: '密码必须包含数字、字母，长度为6-16',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ description: '归属角色', type: [Number] }),
    ArrayNotEmpty(),
    ArrayMinSize(1),
    ArrayMaxSize(3),
    __metadata("design:type", Array)
], UserDto.prototype, "roleIds", void 0);
__decorate([
    ApiProperty({ description: '归属大区', type: Number }),
    Type(() => Number),
    IsInt(),
    IsOptional(),
    __metadata("design:type", Number)
], UserDto.prototype, "deptId", void 0);
__decorate([
    ApiProperty({ description: '呢称', example: 'admin' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "nickname", void 0);
__decorate([
    ApiProperty({ description: '邮箱', example: 'bqy.dev@qq.com' }),
    IsEmail(),
    ValidateIf(o => !isEmpty(o.email)),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ description: '手机号' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "phone", void 0);
__decorate([
    ApiProperty({ description: 'QQ' }),
    IsOptional(),
    IsString(),
    Matches(/^[1-9]\d{4,10}$/),
    MinLength(5),
    MaxLength(11),
    __metadata("design:type", String)
], UserDto.prototype, "qq", void 0);
__decorate([
    ApiProperty({ description: '备注' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "remark", void 0);
__decorate([
    ApiProperty({ description: '状态' }),
    IsIn([0, 1]),
    __metadata("design:type", Number)
], UserDto.prototype, "status", void 0);
export class UserUpdateDto extends PartialType(UserDto) {
}
export class UserQueryDto extends IntersectionType((PagerDto), PartialType(UserDto)) {
}
__decorate([
    ApiProperty({ description: '归属大区', example: 1, required: false }),
    IsInt(),
    IsOptional(),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "deptId", void 0);
__decorate([
    ApiProperty({ description: '状态', example: 0, required: false }),
    IsInt(),
    IsOptional(),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "status", void 0);
//# sourceMappingURL=user.dto.js.map