import { __decorate, __metadata, __param } from "tslib";
import { BadRequestException, Body, Controller, Delete, forwardRef, Get, Inject, Post, Put, Query, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { UpdaterPipe } from '~/common/pipes/updater.pipe';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { SseService } from '~/modules/sse/sse.service';
import { RoleEntity } from '~/modules/system/role/role.entity';
import { MenuService } from '../menu/menu.service';
import { RoleDto, RoleQueryDto, RoleUpdateDto } from './role.dto';
import { RoleInfo } from './role.model';
import { RoleService } from './role.service';
export const permissions = definePermission('system:role', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let RoleController = class RoleController {
    constructor(roleService, menuService, sseService) {
        this.roleService = roleService;
        this.menuService = menuService;
        this.sseService = sseService;
    }
    async list(dto) {
        return this.roleService.list(dto);
    }
    async info(id) {
        return this.roleService.info(id);
    }
    async create(dto) {
        await this.roleService.create(dto);
    }
    async update(id, dto) {
        await this.roleService.update(id, dto);
        await this.menuService.refreshOnlineUserPerms(false);
        this.sseService.noticeClientToUpdateMenusByRoleIds([id]);
    }
    async delete(id) {
        if (await this.roleService.checkUserByRoleId(id))
            throw new BadRequestException('该角色存在关联用户，无法删除');
        await this.roleService.delete(id);
        await this.menuService.refreshOnlineUserPerms(false);
        this.sseService.noticeClientToUpdateMenusByRoleIds([id]);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取角色列表' }),
    ApiResult({ type: [RoleEntity], isPage: true }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoleQueryDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "list", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '获取角色信息' }),
    ApiResult({ type: RoleInfo }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "info", null);
__decorate([
    Post(),
    ApiOperation({ summary: '新增角色' }),
    Perm(permissions.CREATE),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: '更新角色' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body(UpdaterPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, RoleUpdateDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除角色' }),
    Perm(permissions.DELETE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
RoleController = __decorate([
    ApiTags('System - 角色模块'),
    ApiSecurityAuth(),
    Controller('roles'),
    __param(2, Inject(forwardRef(() => SseService))),
    __metadata("design:paramtypes", [RoleService,
        MenuService,
        SseService])
], RoleController);
export { RoleController };
//# sourceMappingURL=role.controller.js.map