import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
let CaptchaLogEntity = class CaptchaLogEntity extends CommonEntity {
};
__decorate([
    Column({ name: 'user_id', nullable: true }),
    ApiProperty({ description: '用户ID' }),
    __metadata("design:type", Number)
], CaptchaLogEntity.prototype, "userId", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '账号' }),
    __metadata("design:type", String)
], CaptchaLogEntity.prototype, "account", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '验证码' }),
    __metadata("design:type", String)
], CaptchaLogEntity.prototype, "code", void 0);
__decorate([
    Column({ nullable: true }),
    ApiProperty({ description: '验证码提供方' }),
    __metadata("design:type", String)
], CaptchaLogEntity.prototype, "provider", void 0);
CaptchaLogEntity = __decorate([
    Entity({ name: 'sys_captcha_log' })
], CaptchaLogEntity);
export { CaptchaLogEntity };
//# sourceMappingURL=captcha-log.entity.js.map