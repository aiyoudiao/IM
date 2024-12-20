import { __decorate } from "tslib";
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/log.module';
import { SYS_TASK_QUEUE_NAME, SYS_TASK_QUEUE_PREFIX } from './constant';
import { TaskController } from './task.controller';
import { TaskEntity } from './task.entity';
import { TaskConsumer } from './task.processor';
import { TaskService } from './task.service';
const providers = [TaskService, TaskConsumer];
let TaskModule = class TaskModule {
};
TaskModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([TaskEntity]),
            BullModule.registerQueueAsync({
                name: SYS_TASK_QUEUE_NAME,
                useFactory: (configService) => ({
                    redis: configService.get('redis'),
                    prefix: SYS_TASK_QUEUE_PREFIX,
                }),
                inject: [ConfigService],
            }),
            LogModule,
        ],
        controllers: [TaskController],
        providers: [...providers],
        exports: [TypeOrmModule, ...providers],
    })
], TaskModule);
export { TaskModule };
//# sourceMappingURL=task.module.js.map