import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfig } from '~/config';
import { AuthStrategy } from '../auth.constant';
let JwtStrategy = class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
    constructor(securityConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: securityConfig.jwtSecret,
        });
        this.securityConfig = securityConfig;
    }
    async validate(payload) {
        return payload;
    }
};
JwtStrategy = __decorate([
    Injectable(),
    __param(0, Inject(SecurityConfig.KEY)),
    __metadata("design:paramtypes", [Object])
], JwtStrategy);
export { JwtStrategy };
//# sourceMappingURL=jwt.strategy.js.map