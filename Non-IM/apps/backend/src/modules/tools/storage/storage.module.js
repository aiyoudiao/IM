import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '~/modules/user/user.entity';
import { StorageController } from './storage.controller';
import { Storage } from './storage.entity';
import { StorageService } from './storage.service';
const services = [StorageService];
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Storage, UserEntity])],
        controllers: [StorageController],
        providers: [...services],
        exports: [TypeOrmModule, ...services],
    })
], StorageModule);
export { StorageModule };
//# sourceMappingURL=storage.module.js.map