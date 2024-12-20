import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictItemController } from './dict-item.controller';
import { DictItemEntity } from './dict-item.entity';
import { DictItemService } from './dict-item.service';
const services = [DictItemService];
let DictItemModule = class DictItemModule {
};
DictItemModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([DictItemEntity])],
        controllers: [DictItemController],
        providers: [...services],
        exports: [TypeOrmModule, ...services],
    })
], DictItemModule);
export { DictItemModule };
//# sourceMappingURL=dict-item.module.js.map