import { createParamDecorator } from '@nestjs/common';
/**
 * @description 获取当前登录用户信息, 并挂载到request上
 */
export const AuthUser = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    // auth guard will mount this
    const user = request.user;
    return data ? user?.[data] : user;
});
//# sourceMappingURL=auth-user.decorator.js.map