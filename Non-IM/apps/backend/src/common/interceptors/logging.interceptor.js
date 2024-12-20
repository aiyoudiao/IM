var LoggingInterceptor_1;
import { __decorate } from "tslib";
import { Injectable, Logger, } from '@nestjs/common';
import { tap } from 'rxjs';
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new Logger(LoggingInterceptor_1.name, { timestamp: false });
    }
    intercept(context, next) {
        const call$ = next.handle();
        const request = context.switchToHttp().getRequest();
        const content = `${request.method} -> ${request.url}`;
        const isSse = request.headers.accept === 'text/event-stream';
        this.logger.debug(`+++ 请求：${content}`);
        const now = Date.now();
        return call$.pipe(tap(() => {
            if (isSse)
                return;
            this.logger.debug(`--- 响应：${content}${` +${Date.now() - now}ms`}`);
        }));
    }
};
LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    Injectable()
], LoggingInterceptor);
export { LoggingInterceptor };
//# sourceMappingURL=logging.interceptor.js.map