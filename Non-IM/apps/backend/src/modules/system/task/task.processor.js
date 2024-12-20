import { __decorate, __metadata } from "tslib";
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { TaskLogService } from '../log/services/task-log.service';
import { SYS_TASK_QUEUE_NAME } from './constant';
import { TaskService } from './task.service';
let TaskConsumer = class TaskConsumer {
    constructor(taskService, taskLogService) {
        this.taskService = taskService;
        this.taskLogService = taskLogService;
    }
    async handle(job) {
        const startTime = Date.now();
        const { data } = job;
        try {
            await this.taskService.callService(data.service, data.args);
            const timing = Date.now() - startTime;
            // 任务执行成功
            await this.taskLogService.create(data.id, 1, timing);
        }
        catch (e) {
            const timing = Date.now() - startTime;
            // 执行失败
            await this.taskLogService.create(data.id, 0, timing, `${e}`);
        }
    }
    onCompleted(job) {
        this.taskService.updateTaskCompleteStatus(job.data.id);
    }
};
__decorate([
    Process(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskConsumer.prototype, "handle", null);
__decorate([
    OnQueueCompleted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskConsumer.prototype, "onCompleted", null);
TaskConsumer = __decorate([
    Processor(SYS_TASK_QUEUE_NAME),
    __metadata("design:paramtypes", [TaskService,
        TaskLogService])
], TaskConsumer);
export { TaskConsumer };
//# sourceMappingURL=task.processor.js.map