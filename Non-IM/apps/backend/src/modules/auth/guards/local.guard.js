import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../auth.constant';
let LocalGuard = class LocalGuard extends AuthGuard(AuthStrategy.LOCAL) {
    async canActivate(context) {
        return true;
    }
};
LocalGuard = __decorate([
    Injectable()
], LocalGuard);
export { LocalGuard };
//# sourceMappingURL=local.guard.js.map