import { __decorate, __metadata } from "tslib";
import { Injectable, RequestTimeoutException, } from '@nestjs/common';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
let TimeoutInterceptor = class TimeoutInterceptor {
    constructor(time = 10000) {
        this.time = time;
    }
    intercept(context, next) {
        return next.handle().pipe(timeout(this.time), catchError((err) => {
            if (err instanceof TimeoutError)
                return throwError(() => new RequestTimeoutException('请求超时'));
            return throwError(() => err);
        }));
    }
};
TimeoutInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Number])
], TimeoutInterceptor);
export { TimeoutInterceptor };
//# sourceMappingURL=timeout.interceptor.js.map