import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class LoginDto {
}
__decorate([
    ApiProperty({ description: '手机号/邮箱' }),
    IsString(),
    MinLength(4),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '密码', example: 'a123456' }),
    IsString(),
    Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i),
    MinLength(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ description: '验证码标识' }),
    IsString(),
    __metadata("design:type", String)
], LoginDto.prototype, "captchaId", void 0);
__decorate([
    ApiProperty({ description: '用户输入的验证码' }),
    IsString(),
    MinLength(4),
    MaxLength(4),
    __metadata("design:type", String)
], LoginDto.prototype, "verifyCode", void 0);
export class RegisterDto {
}
__decorate([
    ApiProperty({ description: '账号' }),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '密码' }),
    IsString(),
    Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i),
    MinLength(6),
    MaxLength(16),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ description: '语言', examples: ['EN', 'ZH'] }),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "lang", void 0);
//# sourceMappingURL=auth.dto.js.map