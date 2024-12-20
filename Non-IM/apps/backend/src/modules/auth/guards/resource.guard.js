import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArray, isEmpty, isNil } from 'lodash';
import { DataSource, In } from 'typeorm';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { ErrorEnum } from '~/constants/error-code.constant';
import { PUBLIC_KEY, RESOURCE_KEY, Roles } from '../auth.constant';
let ResourceGuard = class ResourceGuard {
    constructor(reflector, dataSource) {
        this.reflector = reflector;
        this.dataSource = dataSource;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const isSse = request.headers.accept === 'text/event-stream';
        // 忽略 sse 请求
        if (isPublic || isSse)
            return true;
        const { user } = request;
        if (!user)
            return false;
        // 如果是检查资源所属，且不是超级管理员，还需要进一步判断是否是自己的数据
        const { entity, condition } = this.reflector.get(RESOURCE_KEY, context.getHandler()) ?? { entity: null, condition: null };
        if (entity && !user.roles.includes(Roles.ADMIN)) {
            const repo = this.dataSource.getRepository(entity);
            /**
             * 获取请求中的 items (ids) 验证数据拥有者
             * @param request
             */
            const getRequestItems = (request) => {
                const { params = {}, body = {}, query = {} } = (request ?? {});
                const id = params.id ?? body.id ?? query.id;
                if (id)
                    return [id];
                const { items } = body;
                return !isNil(items) && isArray(items) ? items : [];
            };
            const items = getRequestItems(request);
            if (isEmpty(items))
                throw new BusinessException(ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND);
            if (condition)
                return condition(repo, items, user);
            const recordQuery = {
                where: {
                    id: In(items),
                    user: { id: user.uid },
                },
                relations: ['user'],
            };
            const records = await repo.find(recordQuery);
            if (isEmpty(records))
                throw new BusinessException(ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND);
        }
        return true;
    }
};
ResourceGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        DataSource])
], ResourceGuard);
export { ResourceGuard };
//# sourceMappingURL=resource.guard.js.map