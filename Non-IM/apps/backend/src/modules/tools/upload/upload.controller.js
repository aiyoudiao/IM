var _a, _b;
import { __decorate, __metadata, __param } from "tslib";
import { BadRequestException, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { FileUploadDto } from './upload.dto';
import { UploadService } from './upload.service';
export const permissions = definePermission('upload', {
    UPLOAD: 'upload',
});
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async upload(req, user) {
        if (!req.isMultipart())
            throw new BadRequestException('Request is not multipart');
        const file = await req.file();
        // https://github.com/fastify/fastify-multipart
        // const parts = req.files()
        // for await (const part of parts)
        //   console.log(part.file)
        try {
            const path = await this.uploadService.saveFile(file, user.uid);
            return {
                filename: path,
            };
        }
        catch (error) {
            console.log(error);
            throw new BadRequestException('上传失败');
        }
    }
};
__decorate([
    Post(),
    Perm(permissions.UPLOAD),
    ApiOperation({ summary: '上传' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
        type: FileUploadDto,
    }),
    __param(0, Req()),
    __param(1, AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof FastifyRequest !== "undefined" && FastifyRequest) === "function" ? _a : Object, typeof (_b = typeof IAuthUser !== "undefined" && IAuthUser) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "upload", null);
UploadController = __decorate([
    ApiSecurityAuth(),
    ApiTags('Tools - 上传模块'),
    Controller('upload'),
    __metadata("design:paramtypes", [UploadService])
], UploadController);
export { UploadController };
//# sourceMappingURL=upload.controller.js.map