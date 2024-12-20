import { __decorate, __metadata } from "tslib";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { AccessTokenEntity } from './access-token.entity';
let RefreshTokenEntity = class RefreshTokenEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "id", void 0);
__decorate([
    Column({ length: 500 }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "value", void 0);
__decorate([
    Column({ comment: '令牌过期时间' }),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "expired_at", void 0);
__decorate([
    CreateDateColumn({ comment: '令牌创建时间' }),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "created_at", void 0);
__decorate([
    OneToOne(() => AccessTokenEntity, accessToken => accessToken.refreshToken, {
        onDelete: 'CASCADE',
    }),
    JoinColumn(),
    __metadata("design:type", AccessTokenEntity)
], RefreshTokenEntity.prototype, "accessToken", void 0);
RefreshTokenEntity = __decorate([
    Entity('user_refresh_tokens')
], RefreshTokenEntity);
export { RefreshTokenEntity };
//# sourceMappingURL=refresh-token.entity.js.map