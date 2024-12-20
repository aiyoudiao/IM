import { registerAs } from '@nestjs/config';
import { env, envNumber } from '~/global/env';
export const securityRegToken = 'security';
export const SecurityConfig = registerAs(securityRegToken, () => ({
    jwtSecret: env('JWT_SECRET'),
    jwtExprire: envNumber('JWT_EXPIRE'),
    refreshSecret: env('REFRESH_TOKEN_SECRET'),
    refreshExpire: envNumber('REFRESH_TOKEN_EXPIRE'),
}));
//# sourceMappingURL=security.config.js.map