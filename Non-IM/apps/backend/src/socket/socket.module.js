import { __decorate } from "tslib";
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { SystemModule } from '../modules/system/system.module';
import { AdminEventsGateway } from './events/admin.gateway';
import { WebEventsGateway } from './events/web.gateway';
const providers = [AdminEventsGateway, WebEventsGateway];
let SocketModule = class SocketModule {
};
SocketModule = __decorate([
    Module({
        imports: [forwardRef(() => SystemModule), AuthModule],
        providers,
        exports: [...providers],
    })
], SocketModule);
export { SocketModule };
//# sourceMappingURL=socket.module.js.map