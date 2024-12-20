var _a, _b;
import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { KickDto } from './online.dto';
import { OnlineUserInfo } from './online.model';
import { OnlineService } from './online.service';
export const permissions = definePermission('system:online', ['list', 'kick']);
let OnlineController = class OnlineController {
    constructor(onlineService) {
        this.onlineService = onlineService;
    }
    async list(req) {
        return this.onlineService.listOnlineUser(req.accessToken);
    }
    async kick(dto, user) {
        await this.onlineService.kickUser(dto.tokenId, user);
    }
};
__decorate([
    Get('list'),
    ApiOperation({ summary: '查询当前在线用户' }),
    ApiResult({ type: [OnlineUserInfo] }),
    Perm(permissions.LIST),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof FastifyRequest !== "undefined" && FastifyRequest) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "list", null);
__decorate([
    Post('kick'),
    ApiOperation({ summary: '下线指定在线用户' }),
    Perm(permissions.KICK),
    __param(0, Body()),
    __param(1, AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KickDto, typeof (_b = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "kick", null);
OnlineController = __decorate([
    ApiTags('System - 在线用户模块'),
    ApiSecurityAuth(),
    ApiExtraModels(OnlineUserInfo),
    Controller('online'),
    __metadata("design:paramtypes", [OnlineService])
], OnlineController);
export { OnlineController };
//# sourceMappingURL=online.controller.js.map