import { __decorate, __metadata } from "tslib";
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { AllowAnon } from '~/modules/auth/decorators/allow-anon.decorator';
import { ServeStatInfo } from './serve.model';
import { ServeService } from './serve.service';
let ServeController = class ServeController {
    constructor(serveService) {
        this.serveService = serveService;
    }
    async stat() {
        return this.serveService.getServeStat();
    }
};
__decorate([
    Get('stat'),
    ApiOperation({ summary: '获取服务器运行信息' }),
    ApiResult({ type: ServeStatInfo }),
    AllowAnon(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServeController.prototype, "stat", null);
ServeController = __decorate([
    ApiTags('System - 服务监控'),
    ApiSecurityAuth(),
    ApiExtraModels(ServeStatInfo),
    Controller('serve'),
    UseInterceptors(CacheInterceptor),
    CacheKey('serve_stat'),
    CacheTTL(10000),
    __metadata("design:paramtypes", [ServeService])
], ServeController);
export { ServeController };
//# sourceMappingURL=serve.controller.js.map