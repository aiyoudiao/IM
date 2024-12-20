import { __decorate, __metadata } from "tslib";
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VirtualColumn, } from 'typeorm';
// 如果觉得前端转换时间太麻烦，并且不考虑通用性的话，可以在服务端进行转换，eg: @UpdateDateColumn({ name: 'updated_at', transformer })
// const transformer: ValueTransformer = {
//   to(value) {
//     return value
//   },
//   from(value) {
//     return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
//   },
// }
export class CommonEntity extends BaseEntity {
}
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CommonEntity.prototype, "id", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "updatedAt", void 0);
export class CompleteEntity extends CommonEntity {
}
__decorate([
    ApiHideProperty(),
    Exclude(),
    Column({ name: 'create_by', update: false, comment: '创建者', nullable: true }),
    __metadata("design:type", Number)
], CompleteEntity.prototype, "createBy", void 0);
__decorate([
    ApiHideProperty(),
    Exclude(),
    Column({ name: 'update_by', comment: '更新者', nullable: true }),
    __metadata("design:type", Number)
], CompleteEntity.prototype, "updateBy", void 0);
__decorate([
    ApiProperty({ description: '创建者' }),
    VirtualColumn({ query: alias => `SELECT username FROM sys_user WHERE id = ${alias}.create_by` }),
    __metadata("design:type", String)
], CompleteEntity.prototype, "creator", void 0);
__decorate([
    ApiProperty({ description: '更新者' }),
    VirtualColumn({ query: alias => `SELECT username FROM sys_user WHERE id = ${alias}.update_by` }),
    __metadata("design:type", String)
], CompleteEntity.prototype, "updater", void 0);
//# sourceMappingURL=common.entity.js.map