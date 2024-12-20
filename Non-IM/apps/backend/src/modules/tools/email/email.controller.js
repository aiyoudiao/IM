import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { MailerService } from '~/shared/mailer/mailer.service';
import { EmailSendDto } from './email.dto';
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async send(dto) {
        const { to, subject, content } = dto;
        await this.emailService.send(to, subject, content, 'html');
    }
};
__decorate([
    ApiOperation({ summary: '发送邮件' }),
    Post('send'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailSendDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "send", null);
EmailController = __decorate([
    ApiTags('System - 邮箱模块'),
    ApiSecurityAuth(),
    Controller('email'),
    __metadata("design:paramtypes", [MailerService])
], EmailController);
export { EmailController };
//# sourceMappingURL=email.controller.js.map