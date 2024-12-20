import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CompleteEntity } from '~/common/entity/common.entity';
let DictTypeEntity = class DictTypeEntity extends CompleteEntity {
};
__decorate([
    Column({ type: 'varchar', length: 50 }),
    ApiProperty({ description: '字典名称' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "name", void 0);
__decorate([
    Column({ type: 'varchar', length: 50, unique: true }),
    ApiProperty({ description: '字典编码' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "code", void 0);
__decorate([
    Column({ type: 'tinyint', default: 1 }),
    ApiProperty({ description: ' 状态' }),
    __metadata("design:type", Number)
], DictTypeEntity.prototype, "status", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    ApiProperty({ description: '备注' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "remark", void 0);
DictTypeEntity = __decorate([
    Entity({ name: 'sys_dict_type' })
], DictTypeEntity);
export { DictTypeEntity };
//# sourceMappingURL=dict-type.entity.js.map