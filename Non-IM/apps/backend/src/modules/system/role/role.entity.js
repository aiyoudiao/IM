import { __decorate, __metadata } from "tslib";
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { UserEntity } from '../../user/user.entity';
import { MenuEntity } from '../menu/menu.entity';
let RoleEntity = class RoleEntity extends CompleteEntity {
};
__decorate([
    Column({ length: 50, unique: true }),
    ApiProperty({ description: '角色名' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    Column({ unique: true, comment: '角色标识' }),
    ApiProperty({ description: '角色标识' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "value", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '角色描述' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "remark", void 0);
__decorate([
    Column({ type: 'tinyint', nullable: true, default: 1 }),
    ApiProperty({ description: '状态：1启用，0禁用' }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '是否默认用户' }),
    __metadata("design:type", Boolean)
], RoleEntity.prototype, "default", void 0);
__decorate([
    ApiHideProperty(),
    ManyToMany(() => UserEntity, user => user.roles),
    __metadata("design:type", Object)
], RoleEntity.prototype, "users", void 0);
__decorate([
    ApiHideProperty(),
    ManyToMany(() => MenuEntity, menu => menu.roles, {}),
    JoinTable({
        name: 'sys_role_menus',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Object)
], RoleEntity.prototype, "menus", void 0);
RoleEntity = __decorate([
    Entity({ name: 'sys_role' })
], RoleEntity);
export { RoleEntity };
//# sourceMappingURL=role.entity.js.map