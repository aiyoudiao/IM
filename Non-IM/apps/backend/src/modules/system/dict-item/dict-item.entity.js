import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
import { DictTypeEntity } from '../dict-type/dict-type.entity';
let DictItemEntity = class DictItemEntity extends CompleteEntity {
};
__decorate([
    ManyToOne(() => DictTypeEntity, { cascade: true, createForeignKeyConstraints: false, onDelete: 'CASCADE' }),
    JoinColumn({ name: 'type_id' }),
    __metadata("design:type", DictTypeEntity)
], DictItemEntity.prototype, "type", void 0);
__decorate([
    Column({ type: 'varchar', length: 50 }),
    ApiProperty({ description: '字典项键名' }),
    __metadata("design:type", String)
], DictItemEntity.prototype, "label", void 0);
__decorate([
    Column({ type: 'varchar', length: 50 }),
    ApiProperty({ description: '字典项值' }),
    __metadata("design:type", String)
], DictItemEntity.prototype, "value", void 0);
__decorate([
    Column({ nullable: true, comment: '字典项排序' }),
    __metadata("design:type", Number)
], DictItemEntity.prototype, "orderNo", void 0);
__decorate([
    Column({ type: 'tinyint', default: 1 }),
    ApiProperty({ description: ' 状态' }),
    __metadata("design:type", Number)
], DictItemEntity.prototype, "status", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    ApiProperty({ description: '备注' }),
    __metadata("design:type", String)
], DictItemEntity.prototype, "remark", void 0);
DictItemEntity = __decorate([
    Entity({ name: 'sys_dict_item' })
], DictItemEntity);
export { DictItemEntity };
//# sourceMappingURL=dict-item.entity.js.map