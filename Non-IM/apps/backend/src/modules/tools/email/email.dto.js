import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
/**
 * 发送邮件
 */
export class EmailSendDto {
}
__decorate([
    ApiProperty({ description: '收件人邮箱' }),
    IsEmail(),
    __metadata("design:type", String)
], EmailSendDto.prototype, "to", void 0);
__decorate([
    ApiProperty({ description: '标题' }),
    IsString(),
    __metadata("design:type", String)
], EmailSendDto.prototype, "subject", void 0);
__decorate([
    ApiProperty({ description: '正文' }),
    IsString(),
    __metadata("design:type", String)
], EmailSendDto.prototype, "content", void 0);
//# sourceMappingURL=email.dto.js.map