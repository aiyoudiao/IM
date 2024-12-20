var LoggerModule_1;
import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
let LoggerModule = LoggerModule_1 = class LoggerModule {
    static forRoot() {
        return {
            global: true,
            module: LoggerModule_1,
            providers: [LoggerService],
            exports: [LoggerService],
        };
    }
};
LoggerModule = LoggerModule_1 = __decorate([
    Module({})
], LoggerModule);
export { LoggerModule };
//# sourceMappingURL=logger.module.js.map