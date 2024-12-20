import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { TaskEntity } from '~/modules/system/task/task.entity';
import { TaskDto, TaskQueryDto, TaskUpdateDto } from './task.dto';
import { TaskService } from './task.service';
export const permissions = definePermission('system:task', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    ONCE: 'once',
    START: 'start',
    STOP: 'stop',
});
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async list(dto) {
        return this.taskService.list(dto);
    }
    async create(dto) {
        const serviceCall = dto.service.split('.');
        await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1]);
        await this.taskService.create(dto);
    }
    async update(id, dto) {
        const serviceCall = dto.service.split('.');
        await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1]);
        await this.taskService.update(id, dto);
    }
    async info(id) {
        return this.taskService.info(id);
    }
    async delete(id) {
        const task = await this.taskService.info(id);
        await this.taskService.delete(task);
    }
    async once(id) {
        const task = await this.taskService.info(id);
        await this.taskService.once(task);
    }
    async stop(id) {
        const task = await this.taskService.info(id);
        await this.taskService.stop(task);
    }
    async start(id) {
        const task = await this.taskService.info(id);
        await this.taskService.start(task);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取任务列表' }),
    ApiResult({ type: [TaskEntity], isPage: true }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskQueryDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "list", null);
__decorate([
    Post(),
    ApiOperation({ summary: '添加任务' }),
    Perm(permissions.CREATE),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: '更新任务' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, TaskUpdateDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '查询任务详细信息' }),
    ApiResult({ type: TaskEntity }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "info", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除任务' }),
    Perm(permissions.DELETE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
__decorate([
    Put(':id/once'),
    ApiOperation({ summary: '手动执行一次任务' }),
    Perm(permissions.ONCE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "once", null);
__decorate([
    Put(':id/stop'),
    ApiOperation({ summary: '停止任务' }),
    Perm(permissions.STOP),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "stop", null);
__decorate([
    Put(':id/start'),
    ApiOperation({ summary: '启动任务' }),
    Perm(permissions.START),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "start", null);
TaskController = __decorate([
    ApiTags('System - 任务调度模块'),
    ApiSecurityAuth(),
    Controller('tasks'),
    __metadata("design:paramtypes", [TaskService])
], TaskController);
export { TaskController };
//# sourceMappingURL=task.controller.js.map