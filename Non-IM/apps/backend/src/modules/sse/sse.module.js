import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { OnlineModule } from '../system/online/online.module';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';
let SseModule = class SseModule {
};
SseModule = __decorate([
    Module({
        imports: [OnlineModule],
        controllers: [SseController],
        providers: [SseService],
        exports: [SseService],
    })
], SseModule);
export { SseModule };
//# sourceMappingURL=sse.module.js.map