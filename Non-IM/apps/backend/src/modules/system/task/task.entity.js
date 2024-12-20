import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
let TaskEntity = class TaskEntity extends CommonEntity {
};
__decorate([
    Column({ type: 'varchar', length: 50, unique: true }),
    ApiProperty({ description: '任务名' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "name", void 0);
__decorate([
    Column(),
    ApiProperty({ description: '任务标识' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "service", void 0);
__decorate([
    Column({ type: 'tinyint', default: 0 }),
    ApiProperty({ description: '任务类型 0cron 1间隔' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "type", void 0);
__decorate([
    Column({ type: 'tinyint', default: 1 }),
    ApiProperty({ description: '任务状态 0禁用 1启用' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "status", void 0);
__decorate([
    Column({ name: 'start_time', type: 'datetime', nullable: true }),
    ApiProperty({ description: '开始时间' }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "startTime", void 0);
__decorate([
    Column({ name: 'end_time', type: 'datetime', nullable: true }),
    ApiProperty({ description: '结束时间' }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "endTime", void 0);
__decorate([
    Column({ type: 'int', nullable: true, default: 0 }),
    ApiProperty({ description: '间隔时间' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "limit", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: 'cron表达式' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "cron", void 0);
__decorate([
    Column({ type: 'int', nullable: true }),
    ApiProperty({ description: '执行次数' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "every", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    ApiProperty({ description: '任务参数' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "data", void 0);
__decorate([
    Column({ name: 'job_opts', type: 'text', nullable: true }),
    ApiProperty({ description: '任务配置' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "jobOpts", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '任务描述' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "remark", void 0);
TaskEntity = __decorate([
    Entity({ name: 'sys_task' })
], TaskEntity);
export { TaskEntity };
//# sourceMappingURL=task.entity.js.map