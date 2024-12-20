import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '../../../user/user.entity';
let LoginLogEntity = class LoginLogEntity extends CommonEntity {
};
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: 'IP' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "ip", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '地址' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "address", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '登录方式' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "provider", void 0);
__decorate([
    Column({ length: 500, nullable: true }),
    ApiProperty({ description: '浏览器ua' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "ua", void 0);
__decorate([
    ManyToOne(() => UserEntity, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", Object)
], LoginLogEntity.prototype, "user", void 0);
LoginLogEntity = __decorate([
    Entity({ name: 'sys_login_log' })
], LoginLogEntity);
export { LoginLogEntity };
//# sourceMappingURL=login-log.entity.js.map