var AllExceptionsFilter_1;
import { __decorate, __metadata } from "tslib";
import { Catch, HttpException, HttpStatus, Logger, } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { ErrorEnum } from '~/constants/error-code.constant';
import { isDev } from '~/global/env';
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new Logger(AllExceptionsFilter_1.name);
        this.registerCatchAllExceptionsHook();
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const url = request.raw.url;
        const status = this.getStatus(exception);
        let message = this.getErrorMessage(exception);
        // 系统内部错误时
        if (status === HttpStatus.INTERNAL_SERVER_ERROR
            && !(exception instanceof BusinessException)) {
            Logger.error(exception, undefined, 'Catch');
            // 生产环境下隐藏错误信息
            if (!isDev)
                message = ErrorEnum.SERVER_ERROR?.split(':')[1];
        }
        else {
            this.logger.warn(`错误信息：(${status}) ${message} Path: ${decodeURI(url)}`);
        }
        const apiErrorCode = exception instanceof BusinessException ? exception.getErrorCode() : status;
        // 返回基础响应结果
        const resBody = {
            code: apiErrorCode,
            message,
            data: null,
        };
        response.status(status).send(resBody);
    }
    getStatus(exception) {
        if (exception instanceof HttpException) {
            return exception.getStatus();
        }
        else if (exception instanceof QueryFailedError) {
            // console.log('driverError', exception.driverError.code)
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else {
            return exception?.status
                ?? exception?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    getErrorMessage(exception) {
        if (exception instanceof HttpException) {
            return exception.message;
        }
        else if (exception instanceof QueryFailedError) {
            return exception.message;
        }
        else {
            return exception?.response?.message ?? exception?.message ?? `${exception}`;
        }
    }
    registerCatchAllExceptionsHook() {
        process.on('unhandledRejection', (reason) => {
            console.error('unhandledRejection: ', reason);
        });
        process.on('uncaughtException', (err) => {
            console.error('uncaughtException: ', err);
        });
    }
};
AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    Catch(),
    __metadata("design:paramtypes", [])
], AllExceptionsFilter);
export { AllExceptionsFilter };
//# sourceMappingURL=any-exception.filter.js.map