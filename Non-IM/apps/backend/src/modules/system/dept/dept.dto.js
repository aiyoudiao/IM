import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, Min, MinLength, ValidateNested, } from 'class-validator';
export class DeptDto {
}
__decorate([
    ApiProperty({ description: '部门名称' }),
    IsString(),
    MinLength(1),
    __metadata("design:type", String)
], DeptDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '父级部门id' }),
    Type(() => Number),
    IsInt(),
    IsOptional(),
    __metadata("design:type", Number)
], DeptDto.prototype, "parentId", void 0);
__decorate([
    ApiProperty({ description: '排序编号', required: false }),
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], DeptDto.prototype, "orderNo", void 0);
export class TransferDeptDto {
}
__decorate([
    ApiProperty({ description: '需要转移的管理员列表编号', type: [Number] }),
    IsArray(),
    ArrayNotEmpty(),
    __metadata("design:type", Array)
], TransferDeptDto.prototype, "userIds", void 0);
__decorate([
    ApiProperty({ description: '需要转移过去的系统部门ID' }),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], TransferDeptDto.prototype, "deptId", void 0);
export class MoveDept {
}
__decorate([
    ApiProperty({ description: '当前部门ID' }),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], MoveDept.prototype, "id", void 0);
__decorate([
    ApiProperty({ description: '移动到指定父级部门的ID' }),
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], MoveDept.prototype, "parentId", void 0);
export class MoveDeptDto {
}
__decorate([
    ApiProperty({ description: '部门列表', type: [MoveDept] }),
    ValidateNested({ each: true }),
    Type(() => MoveDept),
    __metadata("design:type", Array)
], MoveDeptDto.prototype, "depts", void 0);
export class DeptQueryDto {
}
__decorate([
    ApiProperty({ description: '部门名称' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DeptQueryDto.prototype, "name", void 0);
//# sourceMappingURL=dept.dto.js.map