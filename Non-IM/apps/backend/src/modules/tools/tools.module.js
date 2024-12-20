import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { EmailModule } from './email/email.module';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';
const modules = [StorageModule, EmailModule, UploadModule];
let ToolsModule = class ToolsModule {
};
ToolsModule = __decorate([
    Module({
        imports: [...modules, RouterModule.register([
                {
                    path: 'tools',
                    module: ToolsModule,
                    children: [...modules],
                },
            ])],
        exports: [...modules],
    })
], ToolsModule);
export { ToolsModule };
//# sourceMappingURL=tools.module.js.map