import { createParamDecorator } from '@nestjs/common';
import { getIp } from '~/utils/ip.util';
/**
 * 快速获取IP
 */
export const Ip = createParamDecorator((_, context) => {
    const request = context.switchToHttp().getRequest();
    return getIp(request);
});
/**
 * 快速获取request path，并不包括url params
 */
export const Uri = createParamDecorator((_, context) => {
    const request = context.switchToHttp().getRequest();
    return request.routerPath;
});
//# sourceMappingURL=http.decorator.js.map