import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { paginateRaw } from '~/helper/paginate';
import { PaginationTypeEnum } from '~/helper/paginate/interface';
import { Storage } from '~/modules/tools/storage/storage.entity';
import { UserEntity } from '~/modules/user/user.entity';
import { deleteFile } from '~/utils';
let StorageService = class StorageService {
    constructor(storageRepository, userRepository) {
        this.storageRepository = storageRepository;
        this.userRepository = userRepository;
    }
    async create(dto, userId) {
        await this.storageRepository.save({
            ...dto,
            userId,
        });
    }
    /**
     * 删除文件
     */
    async delete(fileIds) {
        const items = await this.storageRepository.findByIds(fileIds);
        await this.storageRepository.delete(fileIds);
        items.forEach((el) => {
            deleteFile(el.path);
        });
    }
    async list({ page, pageSize, name, type, size, extName, time, username, }) {
        const queryBuilder = this.storageRepository
            .createQueryBuilder('storage')
            .leftJoinAndSelect('sys_user', 'user', 'storage.user_id = user.id')
            .where({
            ...(name && { name: Like(`%${name}%`) }),
            ...(type && { type }),
            ...(extName && { extName }),
            ...(size && { size: Between(size[0], size[1]) }),
            ...(time && { createdAt: Between(time[0], time[1]) }),
            ...(username && {
                userId: await (await this.userRepository.findOneBy({ username })).id,
            }),
        })
            .orderBy('storage.created_at', 'DESC');
        const { items, ...rest } = await paginateRaw(queryBuilder, {
            page,
            pageSize,
            paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
        });
        function formatResult(result) {
            return result.map((e) => {
                return {
                    id: e.storage_id,
                    name: e.storage_name,
                    extName: e.storage_ext_name,
                    path: e.storage_path,
                    type: e.storage_type,
                    size: e.storage_size,
                    createdAt: e.storage_created_at,
                    username: e.user_username,
                };
            });
        }
        return {
            items: formatResult(items),
            ...rest,
        };
    }
    async count() {
        return this.storageRepository.count();
    }
};
StorageService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Storage)),
    __param(1, InjectRepository(UserEntity)),
    __metadata("design:paramtypes", [Repository,
        Repository])
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map