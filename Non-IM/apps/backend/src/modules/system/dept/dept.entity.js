import { __decorate, __metadata } from "tslib";
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent, } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { UserEntity } from '../../user/user.entity';
let DeptEntity = class DeptEntity extends CompleteEntity {
};
__decorate([
    Column(),
    ApiProperty({ description: '部门名称' }),
    __metadata("design:type", String)
], DeptEntity.prototype, "name", void 0);
__decorate([
    Column({ nullable: true, default: 0 }),
    ApiProperty({ description: '排序' }),
    __metadata("design:type", Number)
], DeptEntity.prototype, "orderNo", void 0);
__decorate([
    TreeChildren({ cascade: true }),
    __metadata("design:type", Array)
], DeptEntity.prototype, "children", void 0);
__decorate([
    TreeParent({ onDelete: 'SET NULL' }),
    __metadata("design:type", DeptEntity)
], DeptEntity.prototype, "parent", void 0);
__decorate([
    ApiHideProperty(),
    OneToMany(() => UserEntity, user => user.dept),
    __metadata("design:type", Object)
], DeptEntity.prototype, "users", void 0);
DeptEntity = __decorate([
    Entity({ name: 'sys_dept' }),
    Tree('materialized-path')
], DeptEntity);
export { DeptEntity };
//# sourceMappingURL=dept.entity.js.map