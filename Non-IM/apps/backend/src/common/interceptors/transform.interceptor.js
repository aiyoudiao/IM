import { __decorate, __metadata } from "tslib";
import { HttpStatus, Injectable, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import qs from 'qs';
import { map } from 'rxjs/operators';
import { ResOp } from '~/common/model/response.model';
import { BYPASS_KEY } from '../decorators/bypass.decorator';
/**
 * 统一处理接口请求与响应结果，如果不需要则添加 @Bypass 装饰器
 */
let TransformInterceptor = class TransformInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const bypass = this.reflector.get(BYPASS_KEY, context.getHandler());
        if (bypass)
            return next.handle();
        const http = context.switchToHttp();
        const request = http.getRequest();
        // 处理 query 参数，将数组参数转换为数组,如：?a[]=1&a[]=2 => { a: [1, 2] }
        request.query = qs.parse(request.url.split('?').at(1));
        return next.handle().pipe(map((data) => {
            // if (typeof data === 'undefined') {
            //   context.switchToHttp().getResponse().status(HttpStatus.NO_CONTENT);
            //   return data;
            // }
            return new ResOp(HttpStatus.OK, data ?? null);
        }));
    }
};
TransformInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], TransformInterceptor);
export { TransformInterceptor };
//# sourceMappingURL=transform.interceptor.js.map