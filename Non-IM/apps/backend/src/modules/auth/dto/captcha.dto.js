import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsMobilePhone, IsOptional, IsString, } from 'class-validator';
export class ImageCaptchaDto {
    constructor() {
        this.width = 100;
        this.height = 50;
    }
}
__decorate([
    ApiProperty({
        required: false,
        default: 100,
        description: '验证码宽度',
    }),
    Type(() => Number),
    IsInt(),
    IsOptional(),
    __metadata("design:type", Number)
], ImageCaptchaDto.prototype, "width", void 0);
__decorate([
    ApiProperty({
        required: false,
        default: 50,
        description: '验证码宽度',
    }),
    Type(() => Number),
    IsInt(),
    IsOptional(),
    __metadata("design:type", Number)
], ImageCaptchaDto.prototype, "height", void 0);
export class SendEmailCodeDto {
}
__decorate([
    ApiProperty({ description: '邮箱' }),
    IsEmail({}, { message: '邮箱格式不正确' }),
    __metadata("design:type", String)
], SendEmailCodeDto.prototype, "email", void 0);
export class SendSmsCodeDto {
}
__decorate([
    ApiProperty({ description: '手机号' }),
    IsMobilePhone('zh-CN', {}, { message: '手机号格式不正确' }),
    __metadata("design:type", String)
], SendSmsCodeDto.prototype, "phone", void 0);
export class CheckCodeDto {
}
__decorate([
    ApiProperty({ description: '手机号/邮箱' }),
    IsString(),
    __metadata("design:type", String)
], CheckCodeDto.prototype, "account", void 0);
__decorate([
    ApiProperty({ description: '验证码' }),
    IsString(),
    __metadata("design:type", String)
], CheckCodeDto.prototype, "code", void 0);
//# sourceMappingURL=captcha.dto.js.map