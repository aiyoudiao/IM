import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { isEmpty, isNil } from 'lodash';
import { EntityManager, In, Like, Repository } from 'typeorm';
import { ROOT_ROLE_ID } from '~/constants/system.constant';
import { paginate } from '~/helper/paginate';
import { MenuEntity } from '~/modules/system/menu/menu.entity';
import { RoleEntity } from '~/modules/system/role/role.entity';
let RoleService = class RoleService {
    constructor(roleRepository, menuRepository, entityManager) {
        this.roleRepository = roleRepository;
        this.menuRepository = menuRepository;
        this.entityManager = entityManager;
    }
    /**
     * 列举所有角色：除去超级管理员
     */
    async findAll({ page, pageSize, }) {
        return paginate(this.roleRepository, { page, pageSize });
    }
    /**
     * 查询角色列表
     */
    async list({ page, pageSize, name, value, remark, status, }) {
        const queryBuilder = await this.roleRepository
            .createQueryBuilder('role')
            .where({
            ...(name ? { name: Like(`%${name}%`) } : null),
            ...(value ? { value: Like(`%${value}%`) } : null),
            ...(remark ? { remark: Like(`%${remark}%`) } : null),
            ...(!isNil(status) ? { status } : null),
        });
        return paginate(queryBuilder, {
            page,
            pageSize,
        });
    }
    /**
     * 根据角色获取角色信息
     */
    async info(id) {
        const info = await this.roleRepository
            .createQueryBuilder('role')
            .where({
            id,
        })
            .getOne();
        const menus = await this.menuRepository.find({
            where: { roles: { id } },
            select: ['id'],
        });
        return { ...info, menuIds: menus.map(m => m.id) };
    }
    async delete(id) {
        if (id === ROOT_ROLE_ID)
            throw new Error('不能删除超级管理员');
        await this.roleRepository.delete(id);
    }
    /**
     * 增加角色
     */
    async create({ menuIds, ...data }) {
        const role = await this.roleRepository.save({
            ...data,
            menus: menuIds
                ? await this.menuRepository.findBy({ id: In(menuIds) })
                : [],
        });
        return { roleId: role.id };
    }
    /**
     * 更新角色信息
     * 如果传入的menuIds为空，则清空sys_role_menus表中存有的关联数据，参考新增
     */
    async update(id, { menuIds, ...data }) {
        await this.roleRepository.update(id, data);
        await this.entityManager.transaction(async (manager) => {
            const role = await this.roleRepository.findOne({ where: { id } });
            role.menus = menuIds?.length
                ? await this.menuRepository.findBy({ id: In(menuIds) })
                : [];
            await manager.save(role);
        });
    }
    /**
     * 根据用户id查找角色信息
     */
    async getRoleIdsByUser(id) {
        const roles = await this.roleRepository.find({
            where: {
                users: { id },
            },
        });
        if (!isEmpty(roles))
            return roles.map(r => r.id);
        return [];
    }
    async getRoleValues(ids) {
        return (await this.roleRepository.findBy({
            id: In(ids),
        })).map(r => r.value);
    }
    async isAdminRoleByUser(uid) {
        const roles = await this.roleRepository.find({
            where: {
                users: { id: uid },
            },
        });
        if (!isEmpty(roles)) {
            return roles.some(r => r.id === ROOT_ROLE_ID);
        }
        return false;
    }
    hasAdminRole(rids) {
        return rids.includes(ROOT_ROLE_ID);
    }
    /**
     * 根据角色ID查找是否有关联用户
     */
    async checkUserByRoleId(id) {
        return this.roleRepository.exist({
            where: {
                users: {
                    roles: { id },
                },
            },
        });
    }
};
RoleService = __decorate([
    Injectable(),
    __param(0, InjectRepository(RoleEntity)),
    __param(1, InjectRepository(MenuEntity)),
    __param(2, InjectEntityManager()),
    __metadata("design:paramtypes", [Repository,
        Repository,
        EntityManager])
], RoleService);
export { RoleService };
//# sourceMappingURL=role.service.js.map