import { __decorate, __metadata } from "tslib";
import { Injectable, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { ErrorEnum } from '~/constants/error-code.constant';
import { AuthService } from '~/modules/auth/auth.service';
import { ALLOW_ANON_KEY, PERMISSION_KEY, PUBLIC_KEY, Roles } from '../auth.constant';
let RbacGuard = class RbacGuard {
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        if (!user)
            throw new BusinessException(ErrorEnum.INVALID_LOGIN);
        // allowAnon 是需要登录后可访问(无需权限), Public 则是无需登录也可访问.
        const allowAnon = this.reflector.get(ALLOW_ANON_KEY, context.getHandler());
        if (allowAnon)
            return true;
        const payloadPermission = this.reflector.getAllAndOverride(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
        // 控制器没有设置接口权限，则默认通过
        if (!payloadPermission)
            return true;
        // 管理员放开所有权限
        if (user.roles.includes(Roles.ADMIN))
            return true;
        const allPermissions = await this.authService.getPermissionsCache(user.uid) ?? await this.authService.getPermissions(user.uid);
        // console.log(allPermissions)
        let canNext = false;
        // handle permission strings
        if (Array.isArray(payloadPermission)) {
            // 只要有一个权限满足即可
            canNext = payloadPermission.every(i => allPermissions.includes(i));
        }
        if (typeof payloadPermission === 'string')
            canNext = allPermissions.includes(payloadPermission);
        if (!canNext)
            throw new BusinessException(ErrorEnum.NO_PERMISSION);
        return true;
    }
};
RbacGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        AuthService])
], RbacGuard);
export { RbacGuard };
//# sourceMappingURL=rbac.guard.js.map