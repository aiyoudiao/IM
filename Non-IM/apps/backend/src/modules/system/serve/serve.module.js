import { __decorate } from "tslib";
import { forwardRef, Module } from '@nestjs/common';
import { SystemModule } from '../system.module';
import { ServeController } from './serve.controller';
import { ServeService } from './serve.service';
const providers = [ServeService];
let ServeModule = class ServeModule {
};
ServeModule = __decorate([
    Module({
        imports: [forwardRef(() => SystemModule)],
        controllers: [ServeController],
        providers: [...providers],
        exports: [...providers],
    })
], ServeModule);
export { ServeModule };
//# sourceMappingURL=serve.module.js.map