import { __decorate } from "tslib";
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '~/modules/auth/auth.module';
import { SseModule } from '~/modules/sse/sse.module';
import { UserModule } from '../../user/user.module';
import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';
const providers = [OnlineService];
let OnlineModule = class OnlineModule {
};
OnlineModule = __decorate([
    Module({
        imports: [
            UserModule,
            AuthModule,
            forwardRef(() => SseModule),
        ],
        controllers: [OnlineController],
        providers,
        exports: [...providers],
    })
], OnlineModule);
export { OnlineModule };
//# sourceMappingURL=online.module.js.map