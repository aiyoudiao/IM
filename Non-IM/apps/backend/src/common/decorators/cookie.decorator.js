import { createParamDecorator } from '@nestjs/common';
export const Cookies = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
});
//# sourceMappingURL=cookie.decorator.js.map