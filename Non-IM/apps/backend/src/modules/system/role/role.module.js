import { __decorate } from "tslib";
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SseService } from '~/modules/sse/sse.service';
import { MenuModule } from '../menu/menu.module';
import { RoleController } from './role.controller';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
const providers = [RoleService, SseService];
let RoleModule = class RoleModule {
};
RoleModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([RoleEntity]),
            forwardRef(() => MenuModule),
        ],
        controllers: [RoleController],
        providers: [...providers],
        exports: [TypeOrmModule, ...providers],
    })
], RoleModule);
export { RoleModule };
//# sourceMappingURL=role.module.js.map