import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { StorageDeleteDto, StoragePageDto } from './storage.dto';
import { StorageInfo } from './storage.modal';
import { StorageService } from './storage.service';
export const permissions = definePermission('tool:storage', {
    LIST: 'list',
    DELETE: 'delete',
});
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async list(dto) {
        return this.storageService.list(dto);
    }
    async delete(dto) {
        await this.storageService.delete(dto.ids);
    }
};
__decorate([
    Get('list'),
    ApiOperation({ summary: '获取本地存储列表' }),
    ApiResult({ type: [StorageInfo], isPage: true }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StoragePageDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "list", null);
__decorate([
    ApiOperation({ summary: '删除文件' }),
    Post('delete'),
    Perm(permissions.DELETE),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StorageDeleteDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "delete", null);
StorageController = __decorate([
    ApiTags('Tools - 存储模块'),
    ApiSecurityAuth(),
    Controller('storage'),
    __metadata("design:paramtypes", [StorageService])
], StorageController);
export { StorageController };
//# sourceMappingURL=storage.controller.js.map