import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '~/modules/user/user.entity';
let TodoEntity = class TodoEntity extends CommonEntity {
};
__decorate([
    Column(),
    ApiProperty({ description: 'todo' }),
    __metadata("design:type", String)
], TodoEntity.prototype, "value", void 0);
__decorate([
    ApiProperty({ description: 'todo' }),
    Column({ default: false }),
    __metadata("design:type", Boolean)
], TodoEntity.prototype, "status", void 0);
__decorate([
    ManyToOne(() => UserEntity),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", Object)
], TodoEntity.prototype, "user", void 0);
TodoEntity = __decorate([
    Entity('todo')
], TodoEntity);
export { TodoEntity };
//# sourceMappingURL=todo.entity.js.map