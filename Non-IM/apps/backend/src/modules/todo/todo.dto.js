import { __decorate, __metadata } from "tslib";
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PagerDto } from '~/common/dto/pager.dto';
export class TodoDto {
}
__decorate([
    ApiProperty({ description: '名称' }),
    IsString(),
    __metadata("design:type", String)
], TodoDto.prototype, "value", void 0);
export class TodoUpdateDto extends PartialType(TodoDto) {
}
export class TodoQueryDto extends IntersectionType(PagerDto, TodoDto) {
}
//# sourceMappingURL=todo.dto.js.map