import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { LoginLogService } from '~/modules/system/log/services/login-log.service';
import { TaskLogService } from '~/modules/system/log/services/task-log.service';
import { Mission } from '../mission.decorator';
/**
 * 管理后台日志清理任务
 */
let LogClearJob = class LogClearJob {
    constructor(loginLogService, taskLogService) {
        this.loginLogService = loginLogService;
        this.taskLogService = taskLogService;
    }
    async clearLoginLog() {
        await this.loginLogService.clearLog();
    }
    async clearTaskLog() {
        await this.taskLogService.clearLog();
    }
};
LogClearJob = __decorate([
    Injectable(),
    Mission(),
    __metadata("design:paramtypes", [LoginLogService,
        TaskLogService])
], LogClearJob);
export { LogClearJob };
//# sourceMappingURL=log-clear.job.js.map