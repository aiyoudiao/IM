import { __decorate } from "tslib";
import { Global, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { QQService } from './qq.service';
const providers = [
    CronService,
    QQService,
];
let HelperModule = class HelperModule {
};
HelperModule = __decorate([
    Global(),
    Module({
        imports: [],
        providers,
        exports: providers,
    })
], HelperModule);
export { HelperModule };
//# sourceMappingURL=helper.module.js.map