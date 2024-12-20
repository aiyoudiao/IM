import { __decorate, __metadata } from "tslib";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsNotEmpty, IsOptional, IsString, Matches, Validate, ValidateIf, ValidateNested, ValidatorConstraint, } from 'class-validator';
import { isEmpty } from 'lodash';
import { NETDISK_HANDLE_MAX_ITEM } from '~/constants/oss.constant';
let IsLegalNameExpression = class IsLegalNameExpression {
    validate(value, args) {
        try {
            if (isEmpty(value))
                throw new Error('dir name is empty');
            if (value.includes('/'))
                throw new Error('dir name not allow /');
            return true;
        }
        catch (e) {
            return false;
        }
    }
    defaultMessage(_args) {
        // here you can provide default error message if validation failed
        return 'file or dir name invalid';
    }
};
IsLegalNameExpression = __decorate([
    ValidatorConstraint({ name: 'IsLegalNameExpression', async: false })
], IsLegalNameExpression);
export { IsLegalNameExpression };
export class FileOpItem {
}
__decorate([
    ApiProperty({ description: '文件类型', enum: ['file', 'dir'] }),
    IsString(),
    Matches(/(^file$)|(^dir$)/),
    __metadata("design:type", String)
], FileOpItem.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '文件名称' }),
    IsString(),
    IsNotEmpty(),
    Validate(IsLegalNameExpression),
    __metadata("design:type", String)
], FileOpItem.prototype, "name", void 0);
export class GetFileListDto {
}
__decorate([
    ApiProperty({ description: '分页标识' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], GetFileListDto.prototype, "marker", void 0);
__decorate([
    ApiProperty({ description: '当前路径' }),
    IsString(),
    __metadata("design:type", String)
], GetFileListDto.prototype, "path", void 0);
__decorate([
    ApiPropertyOptional({ description: '搜索关键字' }),
    Validate(IsLegalNameExpression),
    ValidateIf(o => !isEmpty(o.key)),
    IsString(),
    __metadata("design:type", String)
], GetFileListDto.prototype, "key", void 0);
export class MKDirDto {
}
__decorate([
    ApiProperty({ description: '文件夹名称' }),
    IsNotEmpty(),
    IsString(),
    Validate(IsLegalNameExpression),
    __metadata("design:type", String)
], MKDirDto.prototype, "dirName", void 0);
__decorate([
    ApiProperty({ description: '所属路径' }),
    IsString(),
    __metadata("design:type", String)
], MKDirDto.prototype, "path", void 0);
export class RenameDto {
}
__decorate([
    ApiProperty({ description: '文件类型' }),
    IsString(),
    Matches(/(^file$)|(^dir$)/),
    __metadata("design:type", String)
], RenameDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '更改的名称' }),
    IsString(),
    IsNotEmpty(),
    Validate(IsLegalNameExpression),
    __metadata("design:type", String)
], RenameDto.prototype, "toName", void 0);
__decorate([
    ApiProperty({ description: '原来的名称' }),
    IsString(),
    IsNotEmpty(),
    Validate(IsLegalNameExpression),
    __metadata("design:type", String)
], RenameDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '路径' }),
    IsString(),
    __metadata("design:type", String)
], RenameDto.prototype, "path", void 0);
export class FileInfoDto {
}
__decorate([
    ApiProperty({ description: '文件名' }),
    IsString(),
    IsNotEmpty(),
    Validate(IsLegalNameExpression),
    __metadata("design:type", String)
], FileInfoDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '文件所在路径' }),
    IsString(),
    __metadata("design:type", String)
], FileInfoDto.prototype, "path", void 0);
export class DeleteDto {
}
__decorate([
    ApiProperty({ description: '需要操作的文件或文件夹', type: [FileOpItem] }),
    Type(() => FileOpItem),
    ArrayMaxSize(NETDISK_HANDLE_MAX_ITEM),
    ValidateNested({ each: true }),
    __metadata("design:type", Array)
], DeleteDto.prototype, "files", void 0);
__decorate([
    ApiProperty({ description: '所在目录' }),
    IsString(),
    __metadata("design:type", String)
], DeleteDto.prototype, "path", void 0);
export class MarkFileDto {
}
__decorate([
    ApiProperty({ description: '文件名' }),
    IsString(),
    IsNotEmpty(),
    Validate(IsLegalNameExpression),
    __metadata("design:type", String)
], MarkFileDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '文件所在路径' }),
    IsString(),
    __metadata("design:type", String)
], MarkFileDto.prototype, "path", void 0);
__decorate([
    ApiProperty({ description: '备注信息' }),
    IsString(),
    __metadata("design:type", String)
], MarkFileDto.prototype, "mark", void 0);
export class FileOpDto {
}
__decorate([
    ApiProperty({ description: '需要操作的文件或文件夹', type: [FileOpItem] }),
    Type(() => FileOpItem),
    ArrayMaxSize(NETDISK_HANDLE_MAX_ITEM),
    ValidateNested({ each: true }),
    __metadata("design:type", Array)
], FileOpDto.prototype, "files", void 0);
__decorate([
    ApiProperty({ description: '操作前的目录' }),
    IsString(),
    __metadata("design:type", String)
], FileOpDto.prototype, "originPath", void 0);
__decorate([
    ApiProperty({ description: '操作后的目录' }),
    IsString(),
    __metadata("design:type", String)
], FileOpDto.prototype, "toPath", void 0);
//# sourceMappingURL=manage.dto.js.map