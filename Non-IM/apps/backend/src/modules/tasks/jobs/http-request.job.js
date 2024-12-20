var HttpRequestJob_1;
import { __decorate, __metadata } from "tslib";
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoggerService } from '~/shared/logger/logger.service';
import { Mission } from '../mission.decorator';
/**
 * Api接口请求类型任务
 */
let HttpRequestJob = HttpRequestJob_1 = class HttpRequestJob {
    constructor(httpService, logger) {
        this.httpService = httpService;
        this.logger = logger;
    }
    /**
     * 发起请求
     * @param config {AxiosRequestConfig}
     */
    async handle(config) {
        if (config) {
            const result = await this.httpService.request(config);
            this.logger.log(result, HttpRequestJob_1.name);
        }
        else {
            throw new BadRequestException('Http request job param is empty');
        }
    }
};
HttpRequestJob = HttpRequestJob_1 = __decorate([
    Injectable(),
    Mission(),
    __metadata("design:paramtypes", [HttpService,
        LoggerService])
], HttpRequestJob);
export { HttpRequestJob };
//# sourceMappingURL=http-request.job.js.map