import { __decorate } from "tslib";
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SseService } from '~/modules/sse/sse.service';
import { RoleModule } from '../role/role.module';
import { MenuController } from './menu.controller';
import { MenuEntity } from './menu.entity';
import { MenuService } from './menu.service';
const providers = [MenuService, SseService];
let MenuModule = class MenuModule {
};
MenuModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([MenuEntity]),
            forwardRef(() => RoleModule),
        ],
        controllers: [MenuController],
        providers: [...providers],
        exports: [TypeOrmModule, ...providers],
    })
], MenuModule);
export { MenuModule };
//# sourceMappingURL=menu.module.js.map