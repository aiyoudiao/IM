import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
export class StorageInfo {
}
__decorate([
    ApiProperty({ description: '文件ID' }),
    __metadata("design:type", Number)
], StorageInfo.prototype, "id", void 0);
__decorate([
    ApiProperty({ description: '文件名' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '文件扩展名' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "extName", void 0);
__decorate([
    ApiProperty({ description: '文件路径' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "path", void 0);
__decorate([
    ApiProperty({ description: '文件类型' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '大小' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "size", void 0);
__decorate([
    ApiProperty({ description: '上传时间' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "createdAt", void 0);
__decorate([
    ApiProperty({ description: '上传者' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "username", void 0);
//# sourceMappingURL=storage.modal.js.map