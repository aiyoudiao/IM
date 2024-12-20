import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from '../user/user.module';
import { NetDiskManageController } from './manager/manage.controller';
import { NetDiskManageService } from './manager/manage.service';
import { NetDiskOverviewController } from './overview/overview.controller';
import { NetDiskOverviewService } from './overview/overview.service';
let NetdiskModule = class NetdiskModule {
};
NetdiskModule = __decorate([
    Module({
        imports: [UserModule, RouterModule.register([
                {
                    path: 'netdisk',
                    module: NetdiskModule,
                },
            ])],
        controllers: [NetDiskManageController, NetDiskOverviewController],
        providers: [NetDiskManageService, NetDiskOverviewService],
    })
], NetdiskModule);
export { NetdiskModule };
//# sourceMappingURL=netdisk.module.js.map