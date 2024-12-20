import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParamConfigController } from './param-config.controller';
import { ParamConfigEntity } from './param-config.entity';
import { ParamConfigService } from './param-config.service';
const services = [ParamConfigService];
let ParamConfigModule = class ParamConfigModule {
};
ParamConfigModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([ParamConfigEntity])],
        controllers: [ParamConfigController],
        providers: [...services],
        exports: [TypeOrmModule, ...services],
    })
], ParamConfigModule);
export { ParamConfigModule };
//# sourceMappingURL=param-config.module.js.map