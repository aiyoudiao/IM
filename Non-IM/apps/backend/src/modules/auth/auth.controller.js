import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { Ip } from '~/common/decorators/http.decorator';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { LocalGuard } from './guards/local.guard';
import { LoginToken } from './models/auth.model';
import { CaptchaService } from './services/captcha.service';
let AuthController = class AuthController {
    constructor(authService, userService, captchaService) {
        this.authService = authService;
        this.userService = userService;
        this.captchaService = captchaService;
    }
    async login(dto, ip, ua) {
        await this.captchaService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
        const token = await this.authService.login(dto.username, dto.password, ip, ua);
        return { token };
    }
    async register(dto) {
        await this.userService.register(dto);
    }
};
__decorate([
    Post('login'),
    ApiOperation({ summary: '登录' }),
    ApiResult({ type: LoginToken }),
    __param(0, Body()),
    __param(1, Ip()),
    __param(2, Headers('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('register'),
    ApiOperation({ summary: '注册' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    ApiTags('Auth - 认证模块'),
    UseGuards(LocalGuard),
    Public(),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService,
        UserService,
        CaptchaService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map