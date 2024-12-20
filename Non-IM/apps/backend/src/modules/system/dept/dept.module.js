import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../user/user.module';
import { RoleModule } from '../role/role.module';
import { DeptController } from './dept.controller';
import { DeptEntity } from './dept.entity';
import { DeptService } from './dept.service';
const services = [DeptService];
let DeptModule = class DeptModule {
};
DeptModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([DeptEntity]), UserModule, RoleModule],
        controllers: [DeptController],
        providers: [...services],
        exports: [TypeOrmModule, ...services],
    })
], DeptModule);
export { DeptModule };
//# sourceMappingURL=dept.module.js.map