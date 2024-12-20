import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { paginate } from '~/helper/paginate';
import { DictTypeEntity } from '~/modules/system/dict-type/dict-type.entity';
let DictTypeService = class DictTypeService {
    constructor(dictTypeRepository) {
        this.dictTypeRepository = dictTypeRepository;
    }
    /**
     * 罗列所有配置
     */
    async page({ page, pageSize, name, code, }) {
        const queryBuilder = this.dictTypeRepository.createQueryBuilder('dict_type').where({
            ...(name && { name: Like(`%${name}%`) }),
            ...(code && { code: Like(`%${code}%`) }),
        });
        return paginate(queryBuilder, { page, pageSize });
    }
    /** 一次性获取所有的字典类型 */
    async getAll() {
        return this.dictTypeRepository.find();
    }
    /**
     * 获取参数总数
     */
    async countConfigList() {
        return this.dictTypeRepository.count();
    }
    /**
     * 新增
     */
    async create(dto) {
        await this.dictTypeRepository.insert(dto);
    }
    /**
     * 更新
     */
    async update(id, dto) {
        await this.dictTypeRepository.update(id, dto);
    }
    /**
     * 删除
     */
    async delete(id) {
        await this.dictTypeRepository.delete(id);
    }
    /**
     * 查询单个
     */
    async findOne(id) {
        return this.dictTypeRepository.findOneBy({ id });
    }
};
DictTypeService = __decorate([
    Injectable(),
    __param(0, InjectRepository(DictTypeEntity)),
    __metadata("design:paramtypes", [Repository])
], DictTypeService);
export { DictTypeService };
//# sourceMappingURL=dict-type.service.js.map