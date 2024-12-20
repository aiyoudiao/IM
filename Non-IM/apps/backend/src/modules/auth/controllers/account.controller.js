var _a, _b, _c, _d, _e, _f, _g;
import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { AllowAnon } from '~/modules/auth/decorators/allow-anon.decorator';
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator';
import { PasswordUpdateDto } from '~/modules/user/dto/password.dto';
import { AccountInfo } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { AccountMenus, AccountUpdateDto } from '../dto/account.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
let AccountController = class AccountController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async profile(user) {
        return this.userService.getAccountInfo(user.uid);
    }
    async logout(user, req) {
        await this.authService.clearLoginStatus(user, req.accessToken);
    }
    async menu(user) {
        return this.authService.getMenus(user.uid);
    }
    async permissions(user) {
        return this.authService.getPermissions(user.uid);
    }
    async update(user, dto) {
        await this.userService.updateAccountInfo(user.uid, dto);
    }
    async password(user, dto) {
        await this.userService.updatePassword(user.uid, dto);
    }
};
__decorate([
    Get('profile'),
    ApiOperation({ summary: '获取账户资料' }),
    ApiResult({ type: AccountInfo }),
    AllowAnon(),
    __param(0, AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "profile", null);
__decorate([
    Get('logout'),
    ApiOperation({ summary: '账户登出' }),
    AllowAnon(),
    __param(0, AuthUser()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _b : Object, typeof (_c = typeof FastifyRequest !== "undefined" && FastifyRequest) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "logout", null);
__decorate([
    Get('menus'),
    ApiOperation({ summary: '获取菜单列表' }),
    ApiResult({ type: [AccountMenus] }),
    AllowAnon(),
    __param(0, AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "menu", null);
__decorate([
    Get('permissions'),
    ApiOperation({ summary: '获取权限列表' }),
    ApiResult({ type: [String] }),
    AllowAnon(),
    __param(0, AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "permissions", null);
__decorate([
    Put('update'),
    ApiOperation({ summary: '更改账户资料' }),
    AllowAnon(),
    __param(0, AuthUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _f : Object, AccountUpdateDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "update", null);
__decorate([
    Post('password'),
    ApiOperation({ summary: '更改账户密码' }),
    AllowAnon(),
    __param(0, AuthUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _g : Object, PasswordUpdateDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "password", null);
AccountController = __decorate([
    ApiTags('Account - 账户模块'),
    ApiSecurityAuth(),
    ApiExtraModels(AccountInfo),
    UseGuards(JwtAuthGuard),
    Controller('account'),
    __metadata("design:paramtypes", [UserService,
        AuthService])
], AccountController);
export { AccountController };
//# sourceMappingURL=account.controller.js.map