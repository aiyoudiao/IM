import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from '~/helper/paginate';
import { ParamConfigEntity } from '~/modules/system/param-config/param-config.entity';
let ParamConfigService = class ParamConfigService {
    constructor(paramConfigRepository) {
        this.paramConfigRepository = paramConfigRepository;
    }
    /**
     * 罗列所有配置
     */
    async page({ page, pageSize, name, }) {
        const queryBuilder = this.paramConfigRepository.createQueryBuilder('config');
        if (name) {
            queryBuilder.where('config.name LIKE :name', {
                name: `%${name}%`,
            });
        }
        return paginate(queryBuilder, { page, pageSize });
    }
    /**
     * 获取参数总数
     */
    async countConfigList() {
        return this.paramConfigRepository.count();
    }
    /**
     * 新增
     */
    async create(dto) {
        await this.paramConfigRepository.insert(dto);
    }
    /**
     * 更新
     */
    async update(id, dto) {
        await this.paramConfigRepository.update(id, dto);
    }
    /**
     * 删除
     */
    async delete(id) {
        await this.paramConfigRepository.delete(id);
    }
    /**
     * 查询单个
     */
    async findOne(id) {
        return this.paramConfigRepository.findOneBy({ id });
    }
    async findValueByKey(key) {
        const result = await this.paramConfigRepository.findOne({
            where: { key },
            select: ['value'],
        });
        if (result)
            return result.value;
        return null;
    }
};
ParamConfigService = __decorate([
    Injectable(),
    __param(0, InjectRepository(ParamConfigEntity)),
    __metadata("design:paramtypes", [Repository])
], ParamConfigService);
export { ParamConfigService };
//# sourceMappingURL=param-config.service.js.map