import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
export class ImageCaptcha {
}
__decorate([
    ApiProperty({ description: 'base64格式的svg图片' }),
    __metadata("design:type", String)
], ImageCaptcha.prototype, "img", void 0);
__decorate([
    ApiProperty({ description: '验证码对应的唯一ID' }),
    __metadata("design:type", String)
], ImageCaptcha.prototype, "id", void 0);
export class LoginToken {
}
__decorate([
    ApiProperty({ description: 'JWT身份Token' }),
    __metadata("design:type", String)
], LoginToken.prototype, "token", void 0);
//# sourceMappingURL=auth.model.js.map