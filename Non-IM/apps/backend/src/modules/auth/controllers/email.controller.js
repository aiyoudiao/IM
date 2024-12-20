import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Ip } from '~/common/decorators/http.decorator';
import { MailerService } from '~/shared/mailer/mailer.service';
import { Public } from '../decorators/public.decorator';
import { SendEmailCodeDto } from '../dto/captcha.dto';
let EmailController = class EmailController {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendEmailCode(dto, ip) {
        // await this.authService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
        const { email } = dto;
        await this.mailerService.checkLimit(email, ip);
        const { code } = await this.mailerService.sendVerificationCode(email);
        await this.mailerService.log(email, code, ip);
    }
};
__decorate([
    Post('send'),
    ApiOperation({ summary: '发送邮箱验证码' }),
    Public(),
    Throttle({ default: { limit: 2, ttl: 600000 } }),
    __param(0, Body()),
    __param(1, Ip()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SendEmailCodeDto, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmailCode", null);
EmailController = __decorate([
    ApiTags('Auth - 认证模块'),
    UseGuards(ThrottlerGuard),
    Controller('auth/email'),
    __metadata("design:paramtypes", [MailerService])
], EmailController);
export { EmailController };
//# sourceMappingURL=email.controller.js.map