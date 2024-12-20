import { NotFoundException } from '@nestjs/common';
import { paginate } from '../paginate';
export class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async list({ page, pageSize, }) {
        return paginate(this.repository, { page, pageSize });
    }
    async findOne(id) {
        const item = await this.repository.createQueryBuilder().where({ id }).getOne();
        if (!item)
            throw new NotFoundException('未找到该记录');
        return item;
    }
    async create(dto) {
        return await this.repository.save(dto);
    }
    async update(id, dto) {
        await this.repository.update(id, dto);
    }
    async delete(id) {
        const item = await this.findOne(id);
        await this.repository.remove(item);
    }
}
//# sourceMappingURL=base.service.js.map