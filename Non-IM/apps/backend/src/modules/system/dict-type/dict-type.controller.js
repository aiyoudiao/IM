import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { CreatorPipe } from '~/common/pipes/creator.pipe';
import { UpdaterPipe } from '~/common/pipes/updater.pipe';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { DictTypeEntity } from '~/modules/system/dict-type/dict-type.entity';
import { DictTypeDto, DictTypeQueryDto } from './dict-type.dto';
import { DictTypeService } from './dict-type.service';
export const permissions = definePermission('system:dict-type', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let DictTypeController = class DictTypeController {
    constructor(dictTypeService) {
        this.dictTypeService = dictTypeService;
    }
    async list(dto) {
        return this.dictTypeService.page(dto);
    }
    async getAll() {
        return this.dictTypeService.getAll();
    }
    async create(dto) {
        await this.dictTypeService.create(dto);
    }
    async info(id) {
        return this.dictTypeService.findOne(id);
    }
    async update(id, dto) {
        await this.dictTypeService.update(id, dto);
    }
    async delete(id) {
        await this.dictTypeService.delete(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取字典类型列表' }),
    ApiResult({ type: [DictTypeEntity], isPage: true }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DictTypeQueryDto]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "list", null);
__decorate([
    Get('select-options'),
    ApiOperation({ summary: '一次性获取所有的字典类型(不分页)' }),
    ApiResult({ type: [DictTypeEntity] }),
    Perm(permissions.LIST),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "getAll", null);
__decorate([
    Post(),
    ApiOperation({ summary: '新增字典类型' }),
    Perm(permissions.CREATE),
    __param(0, Body(CreatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DictTypeDto]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "create", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '查询字典类型信息' }),
    ApiResult({ type: DictTypeEntity }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "info", null);
__decorate([
    Post(':id'),
    ApiOperation({ summary: '更新字典类型' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body(UpdaterPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, DictTypeDto]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除指定的字典类型' }),
    Perm(permissions.DELETE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "delete", null);
DictTypeController = __decorate([
    ApiTags('System - 字典类型模块'),
    ApiSecurityAuth(),
    Controller('dict-type'),
    __metadata("design:paramtypes", [DictTypeService])
], DictTypeController);
export { DictTypeController };
//# sourceMappingURL=dict-type.controller.js.map