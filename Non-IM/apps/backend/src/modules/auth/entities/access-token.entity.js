import { __decorate, __metadata } from "tslib";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { UserEntity } from '~/modules/user/user.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
let AccessTokenEntity = class AccessTokenEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], AccessTokenEntity.prototype, "id", void 0);
__decorate([
    Column({ length: 500 }),
    __metadata("design:type", String)
], AccessTokenEntity.prototype, "value", void 0);
__decorate([
    Column({ comment: '令牌过期时间' }),
    __metadata("design:type", Date)
], AccessTokenEntity.prototype, "expired_at", void 0);
__decorate([
    CreateDateColumn({ comment: '令牌创建时间' }),
    __metadata("design:type", Date)
], AccessTokenEntity.prototype, "created_at", void 0);
__decorate([
    OneToOne(() => RefreshTokenEntity, refreshToken => refreshToken.accessToken, {
        cascade: true,
    }),
    __metadata("design:type", RefreshTokenEntity)
], AccessTokenEntity.prototype, "refreshToken", void 0);
__decorate([
    ManyToOne(() => UserEntity, user => user.accessTokens, {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", UserEntity)
], AccessTokenEntity.prototype, "user", void 0);
AccessTokenEntity = __decorate([
    Entity('user_access_tokens')
], AccessTokenEntity);
export { AccessTokenEntity };
//# sourceMappingURL=access-token.entity.js.map