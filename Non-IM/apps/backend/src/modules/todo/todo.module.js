import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
const services = [TodoService];
let TodoModule = class TodoModule {
};
TodoModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([TodoEntity])],
        controllers: [TodoController],
        providers: [...services],
        exports: [TypeOrmModule, ...services],
    })
], TodoModule);
export { TodoModule };
//# sourceMappingURL=todo.module.js.map