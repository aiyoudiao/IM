import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictTypeController } from './dict-type.controller';
import { DictTypeEntity } from './dict-type.entity';
import { DictTypeService } from './dict-type.service';
const services = [DictTypeService];
let DictTypeModule = class DictTypeModule {
};
DictTypeModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([DictTypeEntity])],
        controllers: [DictTypeController],
        providers: [...services],
        exports: [TypeOrmModule, ...services],
    })
], DictTypeModule);
export { DictTypeModule };
//# sourceMappingURL=dict-type.module.js.map