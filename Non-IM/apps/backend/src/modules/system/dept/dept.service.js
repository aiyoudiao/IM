import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { EntityManager, Repository, TreeRepository } from 'typeorm';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { ErrorEnum } from '~/constants/error-code.constant';
import { DeptEntity } from '~/modules/system/dept/dept.entity';
import { UserEntity } from '~/modules/user/user.entity';
import { deleteEmptyChildren } from '~/utils/list2tree.util';
let DeptService = class DeptService {
    constructor(userRepository, deptRepository, entityManager) {
        this.userRepository = userRepository;
        this.deptRepository = deptRepository;
        this.entityManager = entityManager;
    }
    async list() {
        return this.deptRepository.find({ order: { orderNo: 'DESC' } });
    }
    async info(id) {
        const dept = await this.deptRepository
            .createQueryBuilder('dept')
            .leftJoinAndSelect('dept.parent', 'parent')
            .where({ id })
            .getOne();
        if (isEmpty(dept))
            throw new BusinessException(ErrorEnum.DEPARTMENT_NOT_FOUND);
        return dept;
    }
    async create({ parentId, ...data }) {
        const parent = await this.deptRepository
            .createQueryBuilder('dept')
            .where({ id: parentId })
            .getOne();
        await this.deptRepository.save({
            ...data,
            parent,
        });
    }
    async update(id, { parentId, ...data }) {
        const item = await this.deptRepository
            .createQueryBuilder('dept')
            .where({ id })
            .getOne();
        const parent = await this.deptRepository
            .createQueryBuilder('dept')
            .where({ id: parentId })
            .getOne();
        await this.deptRepository.save({
            ...item,
            ...data,
            parent,
        });
    }
    async delete(id) {
        await this.deptRepository.delete(id);
    }
    /**
     * 移动排序
     */
    async move(depts) {
        await this.entityManager.transaction(async (manager) => {
            await manager.save(depts);
        });
    }
    /**
     * 根据部门查询关联的用户数量
     */
    async countUserByDeptId(id) {
        return this.userRepository.countBy({ dept: { id } });
    }
    /**
     * 查找当前部门下的子部门数量
     */
    async countChildDept(id) {
        const item = await this.deptRepository.findOneBy({ id });
        return (await this.deptRepository.countDescendants(item)) - 1;
    }
    /**
     * 获取部门列表树结构
     */
    async getDeptTree(uid, { name }) {
        const tree = [];
        if (name) {
            const deptList = await this.deptRepository
                .createQueryBuilder('dept')
                .where('dept.name like :name', { name: `%${name}%` })
                .getMany();
            for (const dept of deptList) {
                const deptTree = await this.deptRepository.findDescendantsTree(dept);
                tree.push(deptTree);
            }
            deleteEmptyChildren(tree);
            return tree;
        }
        const deptTree = await this.deptRepository.findTrees({
            depth: 2,
            relations: ['parent'],
        });
        deleteEmptyChildren(deptTree);
        return deptTree;
    }
};
DeptService = __decorate([
    Injectable(),
    __param(0, InjectRepository(UserEntity)),
    __param(1, InjectRepository(DeptEntity)),
    __param(2, InjectEntityManager()),
    __metadata("design:paramtypes", [Repository,
        TreeRepository,
        EntityManager])
], DeptService);
export { DeptService };
//# sourceMappingURL=dept.service.js.map