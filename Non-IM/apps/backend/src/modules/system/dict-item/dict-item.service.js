import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { paginate } from '~/helper/paginate';
import { DictItemEntity } from '~/modules/system/dict-item/dict-item.entity';
let DictItemService = class DictItemService {
    constructor(dictItemRepository) {
        this.dictItemRepository = dictItemRepository;
    }
    /**
     * 罗列所有配置
     */
    async page({ page, pageSize, label, value, typeId, }) {
        const queryBuilder = this.dictItemRepository.createQueryBuilder('dict_item').orderBy({ orderNo: 'ASC' }).where({
            ...(label && { label: Like(`%${label}%`) }),
            ...(value && { value: Like(`%${value}%`) }),
            type: {
                id: typeId,
            },
        });
        return paginate(queryBuilder, { page, pageSize });
    }
    /**
     * 获取参数总数
     */
    async countConfigList() {
        return this.dictItemRepository.count();
    }
    /**
     * 新增
     */
    async create(dto) {
        const { typeId, ...rest } = dto;
        await this.dictItemRepository.insert({
            ...rest,
            type: {
                id: typeId,
            },
        });
    }
    /**
     * 更新
     */
    async update(id, dto) {
        const { typeId, ...rest } = dto;
        await this.dictItemRepository.update(id, {
            ...rest,
            type: {
                id: typeId,
            },
        });
    }
    /**
     * 删除
     */
    async delete(id) {
        await this.dictItemRepository.delete(id);
    }
    /**
     * 查询单个
     */
    async findOne(id) {
        return this.dictItemRepository.findOneBy({ id });
    }
};
DictItemService = __decorate([
    Injectable(),
    __param(0, InjectRepository(DictItemEntity)),
    __metadata("design:paramtypes", [Repository])
], DictItemService);
export { DictItemService };
//# sourceMappingURL=dict-item.service.js.map