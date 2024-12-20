import { __decorate, __metadata, __param } from "tslib";
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from '~/helper/paginate';
import { TodoEntity } from '~/modules/todo/todo.entity';
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async list({ page, pageSize, }) {
        return paginate(this.todoRepository, { page, pageSize });
    }
    async detail(id) {
        const item = await this.todoRepository.findOneBy({ id });
        if (!item)
            throw new NotFoundException('未找到该记录');
        return item;
    }
    async create(dto) {
        await this.todoRepository.save(dto);
    }
    async update(id, dto) {
        await this.todoRepository.update(id, dto);
    }
    async delete(id) {
        const item = await this.detail(id);
        await this.todoRepository.remove(item);
    }
};
TodoService = __decorate([
    Injectable(),
    __param(0, InjectRepository(TodoEntity)),
    __metadata("design:paramtypes", [Repository])
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map