var _a;
import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { UpdaterPipe } from '~/common/pipes/updater.pipe';
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { DictItemEntity } from '~/modules/system/dict-item/dict-item.entity';
import { DictItemDto, DictItemQueryDto } from './dict-item.dto';
import { DictItemService } from './dict-item.service';
export const permissions = definePermission('system:dict-item', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let DictItemController = class DictItemController {
    constructor(dictItemService) {
        this.dictItemService = dictItemService;
    }
    async list(dto) {
        return this.dictItemService.page(dto);
    }
    async create(dto, user) {
        await this.dictItemService.create(dto);
    }
    async info(id) {
        return this.dictItemService.findOne(id);
    }
    async update(id, dto) {
        await this.dictItemService.update(id, dto);
    }
    async delete(id) {
        await this.dictItemService.delete(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取字典项列表' }),
    ApiResult({ type: [DictItemEntity], isPage: true }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DictItemQueryDto]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "list", null);
__decorate([
    Post(),
    ApiOperation({ summary: '新增字典项' }),
    Perm(permissions.CREATE),
    __param(0, Body()),
    __param(1, AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DictItemDto, typeof (_a = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "create", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '查询字典项信息' }),
    ApiResult({ type: DictItemEntity }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "info", null);
__decorate([
    Post(':id'),
    ApiOperation({ summary: '更新字典项' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body(UpdaterPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, DictItemDto]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除指定的字典项' }),
    Perm(permissions.DELETE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "delete", null);
DictItemController = __decorate([
    ApiTags('System - 字典项模块'),
    ApiSecurityAuth(),
    Controller('dict-item'),
    __metadata("design:paramtypes", [DictItemService])
], DictItemController);
export { DictItemController };
//# sourceMappingURL=dict-item.controller.js.map