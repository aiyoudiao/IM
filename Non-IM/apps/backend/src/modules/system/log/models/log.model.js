import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
export class LoginLogInfo {
}
__decorate([
    ApiProperty({ description: '日志编号' }),
    __metadata("design:type", Number)
], LoginLogInfo.prototype, "id", void 0);
__decorate([
    ApiProperty({ description: '登录ip', example: '1.1.1.1' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "ip", void 0);
__decorate([
    ApiProperty({ description: '登录地址' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "address", void 0);
__decorate([
    ApiProperty({ description: '系统', example: 'Windows 10' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "os", void 0);
__decorate([
    ApiProperty({ description: '浏览器', example: 'Chrome' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "browser", void 0);
__decorate([
    ApiProperty({ description: '登录用户名', example: 'admin' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '登录时间', example: '2023-12-22 16:46:20.333843' }),
    __metadata("design:type", String)
], LoginLogInfo.prototype, "time", void 0);
export class TaskLogInfo {
}
__decorate([
    ApiProperty({ description: '日志编号' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "id", void 0);
__decorate([
    ApiProperty({ description: '任务编号' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "taskId", void 0);
__decorate([
    ApiProperty({ description: '任务名称' }),
    __metadata("design:type", String)
], TaskLogInfo.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '创建时间' }),
    __metadata("design:type", String)
], TaskLogInfo.prototype, "createdAt", void 0);
__decorate([
    ApiProperty({ description: '耗时' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "consumeTime", void 0);
__decorate([
    ApiProperty({ description: '执行信息' }),
    __metadata("design:type", String)
], TaskLogInfo.prototype, "detail", void 0);
__decorate([
    ApiProperty({ description: '任务执行状态' }),
    __metadata("design:type", Number)
], TaskLogInfo.prototype, "status", void 0);
//# sourceMappingURL=log.model.js.map