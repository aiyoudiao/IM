import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { Resource } from '~/modules/auth/decorators/resource.decorator';
import { ResourceGuard } from '~/modules/auth/guards/resource.guard';
import { TodoEntity } from '~/modules/todo/todo.entity';
import { TodoDto, TodoQueryDto, TodoUpdateDto } from './todo.dto';
import { TodoService } from './todo.service';
export const permissions = definePermission('todo', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async list(dto) {
        return this.todoService.list(dto);
    }
    async info(id) {
        return this.todoService.detail(id);
    }
    async create(dto) {
        await this.todoService.create(dto);
    }
    async update(id, dto) {
        await this.todoService.update(id, dto);
    }
    async delete(id) {
        await this.todoService.delete(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取Todo列表' }),
    ApiResult({ type: [TodoEntity] }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoQueryDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "list", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '获取Todo详情' }),
    ApiResult({ type: TodoEntity }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "info", null);
__decorate([
    Post(),
    ApiOperation({ summary: '创建Todo' }),
    Perm(permissions.CREATE),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: '更新Todo' }),
    Perm(permissions.UPDATE),
    Resource(TodoEntity),
    __param(0, IdParam()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, TodoUpdateDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除Todo' }),
    Perm(permissions.DELETE),
    Resource(TodoEntity),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "delete", null);
TodoController = __decorate([
    ApiTags('Business - Todo模块'),
    UseGuards(ResourceGuard),
    Controller('todos'),
    __metadata("design:paramtypes", [TodoService])
], TodoController);
export { TodoController };
//# sourceMappingURL=todo.controller.js.map