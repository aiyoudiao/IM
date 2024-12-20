import { __decorate, __metadata, __param } from "tslib";
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { CaptchaLogQueryDto, LoginLogQueryDto, TaskLogQueryDto, } from './dto/log.dto';
import { CaptchaLogEntity } from './entities/captcha-log.entity';
import { TaskLogEntity } from './entities/task-log.entity';
import { LoginLogInfo } from './models/log.model';
import { CaptchaLogService } from './services/captcha-log.service';
import { LoginLogService } from './services/login-log.service';
import { TaskLogService } from './services/task-log.service';
export const permissions = definePermission('system:log', {
    TaskList: 'task:list',
    LogList: 'login:list',
    CaptchaList: 'captcha:list',
});
let LogController = class LogController {
    constructor(loginLogService, taskService, captchaLogService) {
        this.loginLogService = loginLogService;
        this.taskService = taskService;
        this.captchaLogService = captchaLogService;
    }
    async loginLogPage(dto) {
        return this.loginLogService.list(dto);
    }
    async taskList(dto) {
        return this.taskService.list(dto);
    }
    async captchaList(dto) {
        return this.captchaLogService.paginate(dto);
    }
};
__decorate([
    Get('login/list'),
    ApiOperation({ summary: '查询登录日志列表' }),
    ApiResult({ type: [LoginLogInfo], isPage: true }),
    Perm(permissions.TaskList),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginLogQueryDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "loginLogPage", null);
__decorate([
    Get('task/list'),
    ApiOperation({ summary: '查询任务日志列表' }),
    ApiResult({ type: [TaskLogEntity], isPage: true }),
    Perm(permissions.LogList),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskLogQueryDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "taskList", null);
__decorate([
    Get('captcha/list'),
    ApiOperation({ summary: '查询验证码日志列表' }),
    ApiResult({ type: [CaptchaLogEntity], isPage: true }),
    Perm(permissions.CaptchaList),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CaptchaLogQueryDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "captchaList", null);
LogController = __decorate([
    ApiSecurityAuth(),
    ApiTags('System - 日志模块'),
    Controller('log'),
    __metadata("design:paramtypes", [LoginLogService,
        TaskLogService,
        CaptchaLogService])
], LogController);
export { LogController };
//# sourceMappingURL=log.controller.js.map