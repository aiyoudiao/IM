import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
export class AccountInfo {
}
__decorate([
    ApiProperty({ description: '用户名' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '昵称' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "nickname", void 0);
__decorate([
    ApiProperty({ description: '邮箱' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "email", void 0);
__decorate([
    ApiProperty({ description: '手机号' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "phone", void 0);
__decorate([
    ApiProperty({ description: '备注' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "remark", void 0);
__decorate([
    ApiProperty({ description: '头像' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "avatar", void 0);
//# sourceMappingURL=user.model.js.map