import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { ParamConfigEntity } from '~/modules/system/param-config/param-config.entity';
import { ParamConfigDto, ParamConfigQueryDto } from './param-config.dto';
import { ParamConfigService } from './param-config.service';
export const permissions = definePermission('system:param-config', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let ParamConfigController = class ParamConfigController {
    constructor(paramConfigService) {
        this.paramConfigService = paramConfigService;
    }
    async list(dto) {
        return this.paramConfigService.page(dto);
    }
    async create(dto) {
        await this.paramConfigService.create(dto);
    }
    async info(id) {
        return this.paramConfigService.findOne(id);
    }
    async update(id, dto) {
        await this.paramConfigService.update(id, dto);
    }
    async delete(id) {
        await this.paramConfigService.delete(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取参数配置列表' }),
    ApiResult({ type: [ParamConfigEntity], isPage: true }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ParamConfigQueryDto]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "list", null);
__decorate([
    Post(),
    ApiOperation({ summary: '新增参数配置' }),
    Perm(permissions.CREATE),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ParamConfigDto]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "create", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '查询参数配置信息' }),
    ApiResult({ type: ParamConfigEntity }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "info", null);
__decorate([
    Post(':id'),
    ApiOperation({ summary: '更新参数配置' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ParamConfigDto]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除指定的参数配置' }),
    Perm(permissions.DELETE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "delete", null);
ParamConfigController = __decorate([
    ApiTags('System - 参数配置模块'),
    ApiSecurityAuth(),
    Controller('param-config'),
    __metadata("design:paramtypes", [ParamConfigService])
], ParamConfigController);
export { ParamConfigController };
//# sourceMappingURL=param-config.controller.js.map