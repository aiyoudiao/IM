import { __decorate, __metadata } from "tslib";
import { Column, Entity, ManyToMany } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { RoleEntity } from '../role/role.entity';
let MenuEntity = class MenuEntity extends CompleteEntity {
};
__decorate([
    Column({ name: 'parent_id', nullable: true }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "parentId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "path", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "permission", void 0);
__decorate([
    Column({ type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "type", void 0);
__decorate([
    Column({ nullable: true, default: '' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "icon", void 0);
__decorate([
    Column({ name: 'order_no', type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "orderNo", void 0);
__decorate([
    Column({ name: 'component', nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "component", void 0);
__decorate([
    Column({ name: 'is_ext', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MenuEntity.prototype, "isExt", void 0);
__decorate([
    Column({ name: 'ext_open_mode', type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "extOpenMode", void 0);
__decorate([
    Column({ name: 'keep_alive', type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "keepAlive", void 0);
__decorate([
    Column({ type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "show", void 0);
__decorate([
    Column({ name: 'active_menu', nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "activeMenu", void 0);
__decorate([
    Column({ type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "status", void 0);
__decorate([
    ManyToMany(() => RoleEntity, role => role.menus, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], MenuEntity.prototype, "roles", void 0);
MenuEntity = __decorate([
    Entity({ name: 'sys_menu' })
], MenuEntity);
export { MenuEntity };
//# sourceMappingURL=menu.entity.js.map