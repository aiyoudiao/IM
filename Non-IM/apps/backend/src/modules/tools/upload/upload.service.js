import { __decorate, __metadata, __param } from "tslib";
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';
import { Storage } from '~/modules/tools/storage/storage.entity';
import { fileRename, getExtname, getFilePath, getFileType, getSize, saveLocalFile, } from '~/utils/file.util';
let UploadService = class UploadService {
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }
    /**
     * 保存文件上传记录
     */
    async saveFile(file, userId) {
        if (isNil(file))
            throw new NotFoundException('Have not any file to upload!');
        const fileName = file.filename;
        const size = getSize(file.file.bytesRead);
        const extName = getExtname(fileName);
        const type = getFileType(extName);
        const name = fileRename(fileName);
        const currentDate = dayjs().format('YYYY-MM-DD');
        const path = getFilePath(name, currentDate, type);
        saveLocalFile(await file.toBuffer(), name, currentDate, type);
        await this.storageRepository.save({
            name,
            fileName,
            extName,
            path,
            type,
            size,
            userId,
        });
        return path;
    }
};
UploadService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Storage)),
    __metadata("design:paramtypes", [Repository])
], UploadService);
export { UploadService };
//# sourceMappingURL=upload.service.js.map