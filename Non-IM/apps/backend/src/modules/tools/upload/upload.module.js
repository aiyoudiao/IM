import { __decorate } from "tslib";
import { forwardRef, Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
const services = [UploadService];
let UploadModule = class UploadModule {
};
UploadModule = __decorate([
    Module({
        imports: [forwardRef(() => StorageModule)],
        controllers: [UploadController],
        providers: [...services],
        exports: [...services],
    })
], UploadModule);
export { UploadModule };
//# sourceMappingURL=upload.module.js.map