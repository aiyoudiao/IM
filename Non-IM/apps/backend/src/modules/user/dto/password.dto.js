import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class PasswordUpdateDto {
}
__decorate([
    ApiProperty({ description: '旧密码' }),
    IsString(),
    Matches(/^[\s\S]+$/),
    MinLength(6),
    MaxLength(20),
    __metadata("design:type", String)
], PasswordUpdateDto.prototype, "oldPassword", void 0);
__decorate([
    ApiProperty({ description: '新密码' }),
    Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i, {
        message: '密码必须包含数字、字母，长度为6-16',
    }),
    __metadata("design:type", String)
], PasswordUpdateDto.prototype, "newPassword", void 0);
export class UserPasswordDto {
}
__decorate([
    ApiProperty({ description: '更改后的密码' }),
    Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i, {
        message: '密码格式不正确',
    }),
    __metadata("design:type", String)
], UserPasswordDto.prototype, "password", void 0);
export class UserExistDto {
}
__decorate([
    ApiProperty({ description: '登录账号' }),
    IsString(),
    Matches(/^[\w-]{4,16}$/),
    MinLength(6),
    MaxLength(20),
    __metadata("design:type", String)
], UserExistDto.prototype, "username", void 0);
//# sourceMappingURL=password.dto.js.map