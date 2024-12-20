import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
export class StoragePageDto extends PagerDto {
}
__decorate([
    ApiProperty({ description: '文件名' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '文件后缀' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "extName", void 0);
__decorate([
    ApiProperty({ description: '文件类型' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '大小' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "size", void 0);
__decorate([
    ApiProperty({ description: '上传时间' }),
    IsOptional(),
    __metadata("design:type", Array)
], StoragePageDto.prototype, "time", void 0);
__decorate([
    ApiProperty({ description: '上传者' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "username", void 0);
export class StorageCreateDto {
}
__decorate([
    ApiProperty({ description: '文件名' }),
    IsString(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '真实文件名' }),
    IsString(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "fileName", void 0);
__decorate([
    ApiProperty({ description: '文件扩展名' }),
    IsString(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "extName", void 0);
__decorate([
    ApiProperty({ description: '文件路径' }),
    IsString(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "path", void 0);
__decorate([
    ApiProperty({ description: '文件路径' }),
    IsString(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '文件大小' }),
    IsString(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "size", void 0);
export class StorageDeleteDto {
}
__decorate([
    ApiProperty({ description: '需要删除的文件ID列表', type: [Number] }),
    IsArray(),
    ArrayNotEmpty(),
    __metadata("design:type", Array)
], StorageDeleteDto.prototype, "ids", void 0);
//# sourceMappingURL=storage.dto.js.map