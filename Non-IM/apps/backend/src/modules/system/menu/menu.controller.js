import { __decorate, __metadata, __param } from "tslib";
import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Query, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { flattenDeep } from 'lodash';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { CreatorPipe } from '~/common/pipes/creator.pipe';
import { UpdaterPipe } from '~/common/pipes/updater.pipe';
import { definePermission, getDefinePermissions, Perm } from '~/modules/auth/decorators/permission.decorator';
import { MenuDto, MenuQueryDto, MenuUpdateDto } from './menu.dto';
import { MenuItemInfo } from './menu.model';
import { MenuService } from './menu.service';
export const permissions = definePermission('system:menu', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    async list(dto) {
        return this.menuService.list(dto);
    }
    async info(id) {
        return this.menuService.getMenuItemAndParentInfo(id);
    }
    async create(dto) {
        // check
        await this.menuService.check(dto);
        if (!dto.parentId)
            dto.parentId = null;
        await this.menuService.create(dto);
        if (dto.type === 2) {
            // 如果是权限发生更改，则刷新所有在线用户的权限
            await this.menuService.refreshOnlineUserPerms();
        }
    }
    async update(id, dto) {
        // check
        await this.menuService.check(dto);
        if (dto.parentId === -1 || !dto.parentId)
            dto.parentId = null;
        await this.menuService.update(id, dto);
        if (dto.type === 2) {
            // 如果是权限发生更改，则刷新所有在线用户的权限
            await this.menuService.refreshOnlineUserPerms();
        }
    }
    async delete(id) {
        if (await this.menuService.checkRoleByMenuId(id))
            throw new BadRequestException('该菜单存在关联角色，无法删除');
        // 如果有子目录，一并删除
        const childMenus = await this.menuService.findChildMenus(id);
        await this.menuService.deleteMenuItem(flattenDeep([id, childMenus]));
        // 刷新在线用户权限
        await this.menuService.refreshOnlineUserPerms();
    }
    async getPermissions() {
        return getDefinePermissions();
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取所有菜单列表' }),
    ApiResult({ type: [MenuItemInfo] }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MenuQueryDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "list", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '获取菜单或权限信息' }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "info", null);
__decorate([
    Post(),
    ApiOperation({ summary: '新增菜单或权限' }),
    Perm(permissions.CREATE),
    __param(0, Body(CreatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "create", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: '更新菜单或权限' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body(UpdaterPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, MenuUpdateDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除菜单或权限' }),
    Perm(permissions.DELETE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "delete", null);
__decorate([
    Get('permissions'),
    ApiOperation({ summary: '获取后端定义的所有权限集' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "getPermissions", null);
MenuController = __decorate([
    ApiTags('System - 菜单权限模块'),
    ApiSecurityAuth(),
    Controller('menus'),
    __metadata("design:paramtypes", [MenuService])
], MenuController);
export { MenuController };
//# sourceMappingURL=menu.controller.js.map