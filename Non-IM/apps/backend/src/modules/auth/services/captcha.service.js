import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { isEmpty } from 'lodash';
import { InjectRedis } from '~/common/decorators/inject-redis.decorator';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { ErrorEnum } from '~/constants/error-code.constant';
import { genCaptchaImgKey } from '~/helper/genRedisKey';
import { CaptchaLogService } from '~/modules/system/log/services/captcha-log.service';
let CaptchaService = class CaptchaService {
    constructor(redis, captchaLogService) {
        this.redis = redis;
        this.captchaLogService = captchaLogService;
    }
    /**
     * 校验图片验证码
     */
    async checkImgCaptcha(id, code) {
        const result = await this.redis.get(genCaptchaImgKey(id));
        if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase())
            throw new BusinessException(ErrorEnum.INVALID_VERIFICATION_CODE);
        // 校验成功后移除验证码
        await this.redis.del(genCaptchaImgKey(id));
    }
    async log(account, code, provider, uid) {
        await this.captchaLogService.create(account, code, provider, uid);
    }
};
CaptchaService = __decorate([
    Injectable(),
    __param(0, InjectRedis()),
    __metadata("design:paramtypes", [Redis,
        CaptchaLogService])
], CaptchaService);
export { CaptchaService };
//# sourceMappingURL=captcha.service.js.map