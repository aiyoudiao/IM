import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { TaskEntity } from '../../task/task.entity';
let TaskLogEntity = class TaskLogEntity extends CommonEntity {
};
__decorate([
    Column({ type: 'tinyint', default: 0 }),
    ApiProperty({ description: '任务状态：0失败，1成功' }),
    __metadata("design:type", Number)
], TaskLogEntity.prototype, "status", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    ApiProperty({ description: '任务日志信息' }),
    __metadata("design:type", String)
], TaskLogEntity.prototype, "detail", void 0);
__decorate([
    Column({ type: 'int', nullable: true, name: 'consume_time', default: 0 }),
    ApiProperty({ description: '任务耗时' }),
    __metadata("design:type", Number)
], TaskLogEntity.prototype, "consumeTime", void 0);
__decorate([
    ManyToOne(() => TaskEntity),
    JoinColumn({ name: 'task_id' }),
    __metadata("design:type", Object)
], TaskLogEntity.prototype, "task", void 0);
TaskLogEntity = __decorate([
    Entity({ name: 'sys_task_log' })
], TaskLogEntity);
export { TaskLogEntity };
//# sourceMappingURL=task-log.entity.js.map