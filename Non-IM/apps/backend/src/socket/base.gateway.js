import { BusinessEvents } from './business-event.constant';
export class BaseGateway {
    gatewayMessageFormat(type, message, code) {
        return {
            type,
            data: message,
            code,
        };
    }
    handleDisconnect(client) {
        client.send(this.gatewayMessageFormat(BusinessEvents.GATEWAY_CONNECT, 'WebSocket 断开'));
    }
    handleConnect(client) {
        client.send(this.gatewayMessageFormat(BusinessEvents.GATEWAY_CONNECT, 'WebSocket 已连接'));
    }
}
export class BroadcastBaseGateway extends BaseGateway {
    broadcast(event, data) { }
}
//# sourceMappingURL=base.gateway.js.map