import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { MenuService } from '~/modules/system/menu/menu.service';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';
import { UserPasswordDto } from './dto/password.dto';
import { UserDto, UserQueryDto, UserUpdateDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export const permissions = definePermission('system:user', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    PASSWORD_UPDATE: 'password:update',
    PASSWORD_RESET: 'pass:reset',
});
let UserController = class UserController {
    constructor(userService, menuService) {
        this.userService = userService;
        this.menuService = menuService;
    }
    async list(dto) {
        return this.userService.list(dto);
    }
    async read(id) {
        return this.userService.info(id);
    }
    async create(dto) {
        await this.userService.create(dto);
    }
    async update(id, dto) {
        await this.userService.update(id, dto);
        await this.menuService.refreshPerms(id);
    }
    async delete(ids) {
        await this.userService.delete(ids);
        await this.userService.multiForbidden(ids);
    }
    async password(id, dto) {
        await this.userService.forceUpdatePassword(id, dto.password);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取用户列表' }),
    ApiResult({ type: [UserEntity], isPage: true }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '查询用户' }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "read", null);
__decorate([
    Post(),
    ApiOperation({ summary: '新增用户' }),
    Perm(permissions.CREATE),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: '更新用户' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除用户' }),
    ApiParam({ name: 'id', type: String, schema: { oneOf: [{ type: 'string' }, { type: 'number' }] } }),
    Perm(permissions.DELETE),
    __param(0, Param('id', new ParseArrayPipe({ items: Number, separator: ',' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    Post(':id/password'),
    ApiOperation({ summary: '更改用户密码' }),
    Perm(permissions.PASSWORD_UPDATE),
    __param(0, IdParam()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UserPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "password", null);
UserController = __decorate([
    ApiTags('System - 用户模块'),
    ApiSecurityAuth(),
    Controller('users'),
    __metadata("design:paramtypes", [UserService,
        MenuService])
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map