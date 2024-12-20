import { __decorate, __metadata } from "tslib";
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from '~/modules/auth/auth.service';
import { CacheService } from '~/shared/redis/cache.service';
import { createAuthGateway } from '../shared/auth.gateway';
const AuthGateway = createAuthGateway({ namespace: 'admin' });
let AdminEventsGateway = class AdminEventsGateway extends AuthGateway {
    constructor(jwtService, authService, cacheService) {
        super(jwtService, authService, cacheService);
        this.jwtService = jwtService;
        this.authService = authService;
        this.cacheService = cacheService;
    }
    get server() {
        return this._server;
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], AdminEventsGateway.prototype, "_server", void 0);
AdminEventsGateway = __decorate([
    WebSocketGateway({ namespace: 'admin' }),
    __metadata("design:paramtypes", [JwtService,
        AuthService,
        CacheService])
], AdminEventsGateway);
export { AdminEventsGateway };
//# sourceMappingURL=admin.gateway.js.map