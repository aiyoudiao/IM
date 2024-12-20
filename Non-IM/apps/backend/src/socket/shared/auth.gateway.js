import { __decorate, __metadata } from "tslib";
import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketServer } from '@nestjs/websockets';
import { Namespace } from 'socket.io';
import { EventBusEvents } from '~/constants/event-bus.constant';
import { BroadcastBaseGateway } from '../base.gateway';
import { BusinessEvents } from '../business-event.constant';
export function createAuthGateway(options) {
    const { namespace } = options;
    class AuthGateway extends BroadcastBaseGateway {
        constructor(jwtService, tokenService, cacheService) {
            super();
            this.jwtService = jwtService;
            this.tokenService = tokenService;
            this.cacheService = cacheService;
            this.tokenSocketIdMap = new Map();
        }
        async authFailed(client) {
            client.send(this.gatewayMessageFormat(BusinessEvents.AUTH_FAILED, '认证失败'));
            client.disconnect();
        }
        async authToken(token) {
            if (typeof token !== 'string')
                return false;
            const validJwt = async () => {
                try {
                    const ok = await this.jwtService.verifyAsync(token);
                    if (!ok)
                        return false;
                }
                catch {
                    return false;
                }
                // is not crash, is verify
                return true;
            };
            return await validJwt();
        }
        async handleConnection(client) {
            const token = client.handshake.query.token
                || client.handshake.headers.authorization
                || client.handshake.headers.Authorization;
            if (!token)
                return this.authFailed(client);
            if (!(await this.authToken(token)))
                return this.authFailed(client);
            super.handleConnect(client);
            const sid = client.id;
            this.tokenSocketIdMap.set(token.toString(), sid);
        }
        handleDisconnect(client) {
            super.handleDisconnect(client);
        }
        handleTokenExpired(token) {
            // consola.debug(`token expired: ${token}`)
            const server = this.namespace.server;
            const sid = this.tokenSocketIdMap.get(token);
            if (!sid)
                return false;
            const socket = server.of(`/${namespace}`).sockets.get(sid);
            if (socket) {
                socket.disconnect();
                super.handleDisconnect(socket);
                return true;
            }
            return false;
        }
        broadcast(event, data) {
            this.cacheService.emitter.of(`/${namespace}`).emit('message', this.gatewayMessageFormat(event, data));
        }
    }
    __decorate([
        WebSocketServer(),
        __metadata("design:type", Namespace)
    ], AuthGateway.prototype, "namespace", void 0);
    __decorate([
        OnEvent(EventBusEvents.TokenExpired),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], AuthGateway.prototype, "handleTokenExpired", null);
    return AuthGateway;
}
//# sourceMappingURL=auth.gateway.js.map