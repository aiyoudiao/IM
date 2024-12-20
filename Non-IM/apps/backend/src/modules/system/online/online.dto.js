import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
export class KickDto {
}
__decorate([
    ApiProperty({ description: 'tokenId' }),
    IsString(),
    __metadata("design:type", String)
], KickDto.prototype, "tokenId", void 0);
export class OnlineQueryDto extends PagerDto {
}
//# sourceMappingURL=online.dto.js.map