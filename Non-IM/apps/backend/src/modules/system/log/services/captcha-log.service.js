import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { paginate } from '~/helper/paginate';
import { CaptchaLogEntity } from '../entities/captcha-log.entity';
let CaptchaLogService = class CaptchaLogService {
    constructor(captchaLogRepository) {
        this.captchaLogRepository = captchaLogRepository;
    }
    async create(account, code, provider, uid) {
        await this.captchaLogRepository.save({
            account,
            code,
            provider,
            userId: uid,
        });
    }
    async paginate({ page, pageSize }) {
        const queryBuilder = await this.captchaLogRepository
            .createQueryBuilder('captcha_log')
            .orderBy('captcha_log.id', 'DESC');
        return paginate(queryBuilder, {
            page,
            pageSize,
        });
    }
    async clearLog() {
        await this.captchaLogRepository.clear();
    }
    async clearLogBeforeTime(time) {
        await this.captchaLogRepository.delete({ createdAt: LessThan(time) });
    }
};
CaptchaLogService = __decorate([
    Injectable(),
    __param(0, InjectRepository(CaptchaLogEntity)),
    __metadata("design:paramtypes", [Repository])
], CaptchaLogService);
export { CaptchaLogService };
//# sourceMappingURL=captcha-log.service.js.map