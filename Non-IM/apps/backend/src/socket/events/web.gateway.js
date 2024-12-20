import { __decorate, __metadata } from "tslib";
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TokenService } from '~/modules/auth/services/token.service';
import { CacheService } from '~/shared/redis/cache.service';
import { createAuthGateway } from '../shared/auth.gateway';
const AuthGateway = createAuthGateway({ namespace: 'web' });
let WebEventsGateway = class WebEventsGateway extends AuthGateway {
    constructor(jwtService, tokenService, cacheService) {
        super(jwtService, tokenService, cacheService);
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.cacheService = cacheService;
    }
    get server() {
        return this._server;
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], WebEventsGateway.prototype, "_server", void 0);
WebEventsGateway = __decorate([
    WebSocketGateway({ namespace: 'web' }),
    __metadata("design:paramtypes", [JwtService,
        TokenService,
        CacheService])
], WebEventsGateway);
export { WebEventsGateway };
//# sourceMappingURL=web.gateway.js.map