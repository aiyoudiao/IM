import { __decorate, __metadata } from "tslib";
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, } from 'class-validator';
import { MenuEntity } from '~/modules/system/menu/menu.entity';
export class AccountUpdateDto {
}
__decorate([
    ApiProperty({ description: '用户呢称' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "nickname", void 0);
__decorate([
    ApiProperty({ description: '用户邮箱' }),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ description: '用户QQ' }),
    IsOptional(),
    IsString(),
    Matches(/^\d+$/),
    MinLength(5),
    MaxLength(11),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "qq", void 0);
__decorate([
    ApiProperty({ description: '用户手机号' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "phone", void 0);
__decorate([
    ApiProperty({ description: '用户头像' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "avatar", void 0);
__decorate([
    ApiProperty({ description: '用户备注' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "remark", void 0);
export class ResetPasswordDto {
}
__decorate([
    ApiProperty({ description: '临时token', example: 'uuid' }),
    IsString(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "accessToken", void 0);
__decorate([
    ApiProperty({ description: '密码', example: 'a123456' }),
    IsString(),
    Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i),
    MinLength(6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
export class MenuMeta extends PartialType(OmitType(MenuEntity, ['parentId', 'createdAt', 'updatedAt', 'id', 'roles', 'path', 'name'])) {
}
export class AccountMenus extends PickType(MenuEntity, ['id', 'path', 'name', 'component']) {
}
//# sourceMappingURL=account.dto.js.map