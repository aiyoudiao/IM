import { __decorate, __metadata } from "tslib";
import { ConflictException, Injectable, SetMetadata, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, tap } from 'rxjs';
import { CacheService } from '~/shared/redis/cache.service';
import { hashString } from '~/utils';
import { getIp } from '~/utils/ip.util';
import { getRedisKey } from '~/utils/redis.util';
import { HTTP_IDEMPOTENCE_KEY, HTTP_IDEMPOTENCE_OPTIONS } from '../decorators/idempotence.decorator';
const IdempotenceHeaderKey = 'x-idempotence';
let IdempotenceInterceptor = class IdempotenceInterceptor {
    constructor(reflector, cacheService) {
        this.reflector = reflector;
        this.cacheService = cacheService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        // skip Get 请求
        if (request.method.toUpperCase() === 'GET')
            return next.handle();
        const handler = context.getHandler();
        const options = this.reflector.get(HTTP_IDEMPOTENCE_OPTIONS, handler);
        if (!options)
            return next.handle();
        const { errorMessage = '相同请求成功后在 60 秒内只能发送一次', pendingMessage = '相同请求正在处理中...', handler: errorHandler, expired = 60, disableGenerateKey = false, } = options;
        const redis = this.cacheService.getClient();
        const idempotence = request.headers[IdempotenceHeaderKey];
        const key = disableGenerateKey
            ? undefined
            : options.generateKey
                ? options.generateKey(request)
                : this.generateKey(request);
        const idempotenceKey = !!(idempotence || key) && getRedisKey(`idempotence:${idempotence || key}`);
        SetMetadata(HTTP_IDEMPOTENCE_KEY, idempotenceKey)(handler);
        if (idempotenceKey) {
            const resultValue = (await redis.get(idempotenceKey));
            if (resultValue !== null) {
                if (errorHandler)
                    return await errorHandler(request);
                const message = {
                    1: errorMessage,
                    0: pendingMessage,
                }[resultValue];
                throw new ConflictException(message);
            }
            else {
                await redis.set(idempotenceKey, '0', 'EX', expired);
            }
        }
        return next.handle().pipe(tap(async () => {
            if (idempotenceKey) {
                await redis.set(idempotenceKey, '1', 'KEEPTTL');
            }
        }), catchError(async (err) => {
            if (idempotenceKey)
                await redis.del(idempotenceKey);
            throw err;
        }));
    }
    generateKey(req) {
        const { body, params, query = {}, headers, url } = req;
        const obj = { body, url, params, query };
        const uuid = headers['x-uuid'];
        if (uuid) {
            obj.uuid = uuid;
        }
        else {
            const ua = headers['user-agent'];
            const ip = getIp(req);
            if (!ua && !ip)
                return undefined;
            Object.assign(obj, { ua, ip });
        }
        return hashString(JSON.stringify(obj));
    }
};
IdempotenceInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        CacheService])
], IdempotenceInterceptor);
export { IdempotenceInterceptor };
//# sourceMappingURL=idempotence.interceptor.js.map