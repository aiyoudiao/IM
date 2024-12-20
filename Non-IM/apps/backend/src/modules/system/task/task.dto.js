import { __decorate, __metadata } from "tslib";
import { BadRequestException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsDateString, IsIn, IsInt, IsOptional, IsString, MaxLength, Min, MinLength, Validate, ValidateIf, ValidatorConstraint, } from 'class-validator';
import * as parser from 'cron-parser';
import { isEmpty } from 'lodash';
import { PagerDto } from '~/common/dto/pager.dto';
import { IsUnique } from '~/shared/database/constraints/unique.constraint';
import { TaskEntity } from './task.entity';
// cron 表达式验证，bull lib下引用了cron-parser
let IsCronExpression = class IsCronExpression {
    validate(value, _args) {
        try {
            if (isEmpty(value))
                throw new BadRequestException('cron expression is empty');
            parser.parseExpression(value);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    defaultMessage(_args) {
        return 'this cron expression ($value) invalid';
    }
};
IsCronExpression = __decorate([
    ValidatorConstraint({ name: 'isCronExpression', async: false })
], IsCronExpression);
export { IsCronExpression };
export class TaskDto {
    constructor() {
        this.limit = -1;
    }
}
__decorate([
    ApiProperty({ description: '任务名称' }),
    IsUnique({ entity: TaskEntity, message: '任务名称已存在' }),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], TaskDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '调用的服务' }),
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], TaskDto.prototype, "service", void 0);
__decorate([
    ApiProperty({ description: '任务类别：cron | interval' }),
    IsIn([0, 1]),
    __metadata("design:type", Number)
], TaskDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '任务状态' }),
    IsIn([0, 1]),
    __metadata("design:type", Number)
], TaskDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ description: '开始时间', type: Date }),
    IsDateString(),
    ValidateIf(o => !isEmpty(o.startTime)),
    __metadata("design:type", String)
], TaskDto.prototype, "startTime", void 0);
__decorate([
    ApiPropertyOptional({ description: '结束时间', type: Date }),
    IsDateString(),
    ValidateIf(o => !isEmpty(o.endTime)),
    __metadata("design:type", String)
], TaskDto.prototype, "endTime", void 0);
__decorate([
    ApiPropertyOptional({
        description: '限制执行次数，负数则无限制',
    }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], TaskDto.prototype, "limit", void 0);
__decorate([
    ApiProperty({ description: 'cron表达式' }),
    Validate(IsCronExpression),
    ValidateIf(o => o.type === 0),
    __metadata("design:type", String)
], TaskDto.prototype, "cron", void 0);
__decorate([
    ApiProperty({ description: '执行间隔，毫秒单位' }),
    IsInt(),
    Min(100),
    ValidateIf(o => o.type === 1),
    __metadata("design:type", Number)
], TaskDto.prototype, "every", void 0);
__decorate([
    ApiPropertyOptional({ description: '执行参数' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TaskDto.prototype, "data", void 0);
__decorate([
    ApiPropertyOptional({ description: '任务备注' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], TaskDto.prototype, "remark", void 0);
export class TaskUpdateDto extends PartialType(TaskDto) {
}
export class TaskQueryDto extends IntersectionType(PagerDto, PartialType(TaskDto)) {
}
//# sourceMappingURL=task.dto.js.map