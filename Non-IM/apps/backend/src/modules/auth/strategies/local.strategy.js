import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthStrategy } from '../auth.constant';
import { AuthService } from '../auth.service';
let LocalStrategy = class LocalStrategy extends PassportStrategy(Strategy, AuthStrategy.LOCAL) {
    constructor(authService) {
        super({
            usernameField: 'credential',
            passwordField: 'password',
        });
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this.authService.validateUser(username, password);
        return user;
    }
};
LocalStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService])
], LocalStrategy);
export { LocalStrategy };
//# sourceMappingURL=local.strategy.js.map