var EmailJob_1;
import { __decorate, __metadata } from "tslib";
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoggerService } from '~/shared/logger/logger.service';
import { MailerService } from '~/shared/mailer/mailer.service';
import { Mission } from '../mission.decorator';
/**
 * Api接口请求类型任务
 */
let EmailJob = EmailJob_1 = class EmailJob {
    constructor(emailService, logger) {
        this.emailService = emailService;
        this.logger = logger;
    }
    async send(config) {
        if (config) {
            const { to, subject, content } = config;
            const result = await this.emailService.send(to, subject, content);
            this.logger.log(result, EmailJob_1.name);
        }
        else {
            throw new BadRequestException('Email send job param is empty');
        }
    }
};
EmailJob = EmailJob_1 = __decorate([
    Injectable(),
    Mission(),
    __metadata("design:paramtypes", [MailerService,
        LoggerService])
], EmailJob);
export { EmailJob };
//# sourceMappingURL=email.job.js.map