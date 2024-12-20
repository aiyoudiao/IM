import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
export class LoginLogQueryDto extends PagerDto {
}
__decorate([
    ApiProperty({ description: '用户名' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], LoginLogQueryDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '登录IP' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], LoginLogQueryDto.prototype, "ip", void 0);
__decorate([
    ApiProperty({ description: '登录地点' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], LoginLogQueryDto.prototype, "address", void 0);
__decorate([
    ApiProperty({ description: '登录时间' }),
    IsOptional(),
    IsArray(),
    __metadata("design:type", Array)
], LoginLogQueryDto.prototype, "time", void 0);
export class TaskLogQueryDto extends PagerDto {
}
__decorate([
    ApiProperty({ description: '用户名' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TaskLogQueryDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '登录IP' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], TaskLogQueryDto.prototype, "ip", void 0);
__decorate([
    ApiProperty({ description: '登录时间' }),
    IsOptional(),
    __metadata("design:type", Array)
], TaskLogQueryDto.prototype, "time", void 0);
export class CaptchaLogQueryDto extends PagerDto {
}
__decorate([
    ApiProperty({ description: '用户名' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CaptchaLogQueryDto.prototype, "username", void 0);
__decorate([
    ApiProperty({ description: '验证码' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CaptchaLogQueryDto.prototype, "code", void 0);
__decorate([
    ApiProperty({ description: '发送时间' }),
    IsOptional(),
    __metadata("design:type", Array)
], CaptchaLogQueryDto.prototype, "time", void 0);
//# sourceMappingURL=log.dto.js.map