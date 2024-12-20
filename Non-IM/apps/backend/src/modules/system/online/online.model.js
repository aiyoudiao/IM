import { __decorate, __metadata } from "tslib";
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { LoginLogInfo } from '../log/models/log.model';
export class OnlineUserInfo extends OmitType(LoginLogInfo, ['id']) {
}
__decorate([
    ApiProperty({ description: 'tokenId' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "tokenId", void 0);
__decorate([
    ApiProperty({ description: '部门名称' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "deptName", void 0);
__decorate([
    ApiProperty({ description: '用户ID' }),
    __metadata("design:type", Number)
], OnlineUserInfo.prototype, "uid", void 0);
__decorate([
    ApiProperty({ description: '是否为当前登录用户' }),
    __metadata("design:type", Boolean)
], OnlineUserInfo.prototype, "isCurrent", void 0);
__decorate([
    ApiProperty({ description: '不允许踢当前用户或超级管理员下线' }),
    __metadata("design:type", Boolean)
], OnlineUserInfo.prototype, "disable", void 0);
//# sourceMappingURL=online.model.js.map