import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { paginate } from '~/helper/paginate';
import { TaskLogEntity } from '../entities/task-log.entity';
let TaskLogService = class TaskLogService {
    constructor(taskLogRepository) {
        this.taskLogRepository = taskLogRepository;
    }
    async create(tid, status, time, err) {
        const result = await this.taskLogRepository.save({
            status,
            detail: err,
            time,
            task: { id: tid },
        });
        return result.id;
    }
    async list({ page, pageSize }) {
        const queryBuilder = await this.taskLogRepository
            .createQueryBuilder('task_log')
            .leftJoinAndSelect('task_log.task', 'task')
            .orderBy('task_log.id', 'DESC');
        return paginate(queryBuilder, {
            page,
            pageSize,
        });
    }
    async clearLog() {
        await this.taskLogRepository.clear();
    }
    async clearLogBeforeTime(time) {
        await this.taskLogRepository.delete({ createdAt: LessThan(time) });
    }
};
TaskLogService = __decorate([
    Injectable(),
    __param(0, InjectRepository(TaskLogEntity)),
    __metadata("design:paramtypes", [Repository])
], TaskLogService);
export { TaskLogService };
//# sourceMappingURL=task-log.service.js.map