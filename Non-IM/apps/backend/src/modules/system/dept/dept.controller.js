import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { CreatorPipe } from '~/common/pipes/creator.pipe';
import { UpdaterPipe } from '~/common/pipes/updater.pipe';
import { ErrorEnum } from '~/constants/error-code.constant';
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator';
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator';
import { DeptEntity } from '~/modules/system/dept/dept.entity';
import { DeptDto, DeptQueryDto } from './dept.dto';
import { DeptService } from './dept.service';
export const permissions = definePermission('system:dept', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let DeptController = class DeptController {
    constructor(deptService) {
        this.deptService = deptService;
    }
    async list(dto, uid) {
        return this.deptService.getDeptTree(uid, dto);
    }
    async create(dto) {
        await this.deptService.create(dto);
    }
    async info(id) {
        return this.deptService.info(id);
    }
    async update(id, updateDeptDto) {
        await this.deptService.update(id, updateDeptDto);
    }
    async delete(id) {
        // 查询是否有关联用户或者部门，如果含有则无法删除
        const count = await this.deptService.countUserByDeptId(id);
        if (count > 0)
            throw new BusinessException(ErrorEnum.DEPARTMENT_HAS_ASSOCIATED_USERS);
        const count2 = await this.deptService.countChildDept(id);
        console.log('count2', count2);
        if (count2 > 0)
            throw new BusinessException(ErrorEnum.DEPARTMENT_HAS_CHILD_DEPARTMENTS);
        await this.deptService.delete(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: '获取部门列表' }),
    ApiResult({ type: [DeptEntity] }),
    Perm(permissions.LIST),
    __param(0, Query()),
    __param(1, AuthUser('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeptQueryDto, Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "list", null);
__decorate([
    Post(),
    ApiOperation({ summary: '创建部门' }),
    Perm(permissions.CREATE),
    __param(0, Body(CreatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeptDto]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "create", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: '查询部门信息' }),
    Perm(permissions.READ),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "info", null);
__decorate([
    Put(':id'),
    ApiOperation({ summary: '更新部门' }),
    Perm(permissions.UPDATE),
    __param(0, IdParam()),
    __param(1, Body(UpdaterPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, DeptDto]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "update", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: '删除部门' }),
    Perm(permissions.DELETE),
    __param(0, IdParam()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "delete", null);
DeptController = __decorate([
    ApiSecurityAuth(),
    ApiTags('System - 部门模块'),
    Controller('depts'),
    __metadata("design:paramtypes", [DeptService])
], DeptController);
export { DeptController };
//# sourceMappingURL=dept.controller.js.map