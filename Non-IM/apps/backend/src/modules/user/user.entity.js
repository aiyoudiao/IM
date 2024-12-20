import { __decorate, __metadata } from "tslib";
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { AccessTokenEntity } from '~/modules/auth/entities/access-token.entity';
import { DeptEntity } from '~/modules/system/dept/dept.entity';
import { RoleEntity } from '~/modules/system/role/role.entity';
let UserEntity = class UserEntity extends CommonEntity {
};
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    Exclude(),
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    Column({ length: 32 }),
    __metadata("design:type", String)
], UserEntity.prototype, "psalt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    Column({ name: 'avatar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "qq", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "remark", void 0);
__decorate([
    Column({ type: 'tinyint', nullable: true, default: 1 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "status", void 0);
__decorate([
    ManyToMany(() => RoleEntity, role => role.users),
    JoinTable({
        name: 'sys_user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "roles", void 0);
__decorate([
    ManyToOne(() => DeptEntity, dept => dept.users),
    JoinColumn({ name: 'dept_id' }),
    __metadata("design:type", Object)
], UserEntity.prototype, "dept", void 0);
__decorate([
    OneToMany(() => AccessTokenEntity, accessToken => accessToken.user, {
        cascade: true,
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "accessTokens", void 0);
UserEntity = __decorate([
    Entity({ name: 'sys_user' })
], UserEntity);
export { UserEntity };
//# sourceMappingURL=user.entity.js.map