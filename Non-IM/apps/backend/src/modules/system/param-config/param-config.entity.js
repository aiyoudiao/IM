import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
let ParamConfigEntity = class ParamConfigEntity extends CommonEntity {
};
__decorate([
    Column({ type: 'varchar', length: 50 }),
    ApiProperty({ description: '配置名' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "name", void 0);
__decorate([
    Column({ type: 'varchar', length: 50, unique: true }),
    ApiProperty({ description: '配置键名' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "key", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    ApiProperty({ description: '配置值' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "value", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    ApiProperty({ description: '配置描述' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "remark", void 0);
ParamConfigEntity = __decorate([
    Entity({ name: 'sys_config' })
], ParamConfigEntity);
export { ParamConfigEntity };
//# sourceMappingURL=param-config.entity.js.map