import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
export class SFileInfo {
}
__decorate([
    ApiProperty({ description: '文件id' }),
    __metadata("design:type", String)
], SFileInfo.prototype, "id", void 0);
__decorate([
    ApiProperty({ description: '文件类型', enum: ['file', 'dir'] }),
    __metadata("design:type", String)
], SFileInfo.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '文件名称' }),
    __metadata("design:type", String)
], SFileInfo.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '存入时间', type: Date }),
    __metadata("design:type", Date)
], SFileInfo.prototype, "putTime", void 0);
__decorate([
    ApiProperty({ description: '文件大小, byte单位' }),
    __metadata("design:type", String)
], SFileInfo.prototype, "fsize", void 0);
__decorate([
    ApiProperty({ description: '文件的mime-type' }),
    __metadata("design:type", String)
], SFileInfo.prototype, "mimeType", void 0);
__decorate([
    ApiProperty({ description: '所属目录' }),
    __metadata("design:type", String)
], SFileInfo.prototype, "belongTo", void 0);
export class SFileList {
}
__decorate([
    ApiProperty({ description: '文件列表', type: [SFileInfo] }),
    __metadata("design:type", Array)
], SFileList.prototype, "list", void 0);
__decorate([
    ApiProperty({ description: '分页标志，空则代表加载完毕' }),
    __metadata("design:type", String)
], SFileList.prototype, "marker", void 0);
export class UploadToken {
}
__decorate([
    ApiProperty({ description: '上传token' }),
    __metadata("design:type", String)
], UploadToken.prototype, "token", void 0);
export class SFileInfoDetail {
}
__decorate([
    ApiProperty({ description: '文件大小，int64类型，单位为字节（Byte）' }),
    __metadata("design:type", Number)
], SFileInfoDetail.prototype, "fsize", void 0);
__decorate([
    ApiProperty({ description: '文件HASH值' }),
    __metadata("design:type", String)
], SFileInfoDetail.prototype, "hash", void 0);
__decorate([
    ApiProperty({ description: '文件MIME类型，string类型' }),
    __metadata("design:type", String)
], SFileInfoDetail.prototype, "mimeType", void 0);
__decorate([
    ApiProperty({
        description: '文件存储类型，2 表示归档存储，1 表示低频存储，0表示普通存储。',
    }),
    __metadata("design:type", Number)
], SFileInfoDetail.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '文件上传时间', type: Date }),
    __metadata("design:type", Date)
], SFileInfoDetail.prototype, "putTime", void 0);
__decorate([
    ApiProperty({ description: '文件md5值' }),
    __metadata("design:type", String)
], SFileInfoDetail.prototype, "md5", void 0);
__decorate([
    ApiProperty({ description: '上传人' }),
    __metadata("design:type", String)
], SFileInfoDetail.prototype, "uploader", void 0);
__decorate([
    ApiProperty({ description: '文件备注' }),
    __metadata("design:type", String)
], SFileInfoDetail.prototype, "mark", void 0);
//# sourceMappingURL=manage.class.js.map