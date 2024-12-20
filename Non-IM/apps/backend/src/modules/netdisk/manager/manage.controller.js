var _a;
import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { ErrorEnum } from '~/constants/error-code.constant';
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { checkIsDemoMode } from '~/utils';
import { SFileInfoDetail, SFileList, UploadToken } from './manage.class';
import { DeleteDto, FileInfoDto, FileOpDto, GetFileListDto, MarkFileDto, MKDirDto, RenameDto, } from './manage.dto';
import { NetDiskManageService } from './manage.service';
export const permissions = definePermission('netdisk:manage', {
    LIST: 'list',
    CREATE: 'create',
    INFO: 'info',
    UPDATE: 'update',
    DELETE: 'delete',
    MKDIR: 'mkdir',
    TOKEN: 'token',
    MARK: 'mark',
    DOWNLOAD: 'download',
    RENAME: 'rename',
    CUT: 'cut',
    COPY: 'copy',
});
let NetDiskManageController = class NetDiskManageController {
    constructor(manageService) {
        this.manageService = manageService;
    }
    async list(dto) {
        return await this.manageService.getFileList(dto.path, dto.marker, dto.key);
    }
    async mkdir(dto) {
        const result = await this.manageService.checkFileExist(`${dto.path}${dto.dirName}/`);
        if (result)
            throw new BusinessException(ErrorEnum.OSS_FILE_OR_DIR_EXIST);
        await this.manageService.createDir(`${dto.path}${dto.dirName}`);
    }
    async token(user) {
        checkIsDemoMode();
        return {
            token: this.manageService.createUploadToken(`${user.uid}`),
        };
    }
    async info(dto) {
        return await this.manageService.getFileInfo(dto.name, dto.path);
    }
    async mark(dto) {
        await this.manageService.changeFileHeaders(dto.name, dto.path, {
            mark: dto.mark,
        });
    }
    async download(dto) {
        return this.manageService.getDownloadLink(`${dto.path}${dto.name}`);
    }
    async rename(dto) {
        const result = await this.manageService.checkFileExist(`${dto.path}${dto.toName}${dto.type === 'dir' ? '/' : ''}`);
        if (result)
            throw new BusinessException(ErrorEnum.OSS_FILE_OR_DIR_EXIST);
        if (dto.type === 'file')
            await this.manageService.renameFile(dto.path, dto.name, dto.toName);
        else
            await this.manageService.renameDir(dto.path, dto.name, dto.toName);
    }
    async delete(dto) {
        await this.manageService.deleteMultiFileOrDir(dto.files, dto.path);
    }
    async cut(dto) {
        if (dto.originPath === dto.toPath)
            throw new BusinessException(ErrorEnum.OSS_NO_OPERATION_REQUIRED);
        await this.manageService.moveMultiFileOrDir(dto.files, dto.originPath, dto.toPath);
    }
    async copy(dto) {
        await this.manageService.copyMultiFileOrDir(dto.files, dto.originPath, dto.toPath);
    }
};
__decorate([
    Get('list'),
    ApiOperation({ summary: '获取文件列表' }),
    ApiOkResponse({ type: SFileList }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetFileListDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "list", null);
__decorate([
    Post('mkdir'),
    ApiOperation({ summary: '创建文件夹，支持多级' }),
    Perm(permissions.MKDIR),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MKDirDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "mkdir", null);
__decorate([
    Get('token'),
    ApiOperation({ summary: '获取上传Token，无Token前端无法上传' }),
    ApiOkResponse({ type: UploadToken }),
    Perm(permissions.TOKEN),
    __param(0, AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "token", null);
__decorate([
    Get('info'),
    ApiOperation({ summary: '获取文件详细信息' }),
    ApiOkResponse({ type: SFileInfoDetail }),
    Perm(permissions.INFO),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FileInfoDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "info", null);
__decorate([
    Post('mark'),
    ApiOperation({ summary: '添加文件备注' }),
    Perm(permissions.MARK),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MarkFileDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "mark", null);
__decorate([
    Get('download'),
    ApiOperation({ summary: '获取下载链接，不支持下载文件夹' }),
    ApiOkResponse({ type: String }),
    Perm(permissions.DOWNLOAD),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FileInfoDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "download", null);
__decorate([
    Post('rename'),
    ApiOperation({ summary: '重命名文件或文件夹' }),
    Perm(permissions.RENAME),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RenameDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "rename", null);
__decorate([
    Post('delete'),
    ApiOperation({ summary: '删除文件或文件夹' }),
    Perm(permissions.DELETE),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "delete", null);
__decorate([
    Post('cut'),
    ApiOperation({ summary: '剪切文件或文件夹，支持批量' }),
    Perm(permissions.CUT),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FileOpDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "cut", null);
__decorate([
    Post('copy'),
    ApiOperation({ summary: '复制文件或文件夹，支持批量' }),
    Perm(permissions.COPY),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FileOpDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "copy", null);
NetDiskManageController = __decorate([
    ApiTags('NetDiskManage - 网盘管理模块'),
    Controller('manage'),
    __metadata("design:paramtypes", [NetDiskManageService])
], NetDiskManageController);
export { NetDiskManageController };
//# sourceMappingURL=manage.controller.js.map