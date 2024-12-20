import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { ROOT_ROLE_ID } from '~/constants/system.constant';
import { RoleEntity } from '~/modules/system/role/role.entity';
import { UserEntity } from '~/modules/user/user.entity';
const clientMap = new Map();
let SseService = class SseService {
    addClient(uid, subscriber) {
        const clients = clientMap.get(uid) || [];
        clientMap.set(uid, clients.concat(subscriber));
    }
    /** 移除与关闭指定端的用户(允许多端登录时的情况) */
    removeClient(uid, subscriber) {
        const clients = clientMap.get(uid);
        const targetIndex = clients?.findIndex(client => client === subscriber);
        if (targetIndex !== -1)
            clients?.splice(targetIndex, 1).at(0)?.complete();
    }
    /** 移除与关闭指定用户的连接 */
    removeClients(uid) {
        const clients = clientMap.get(uid);
        clients?.forEach((client) => {
            client?.complete();
        });
        clientMap.delete(uid);
    }
    /** 推送给指定用户 */
    sendToClients(uid, data) {
        const clients = clientMap.get(uid);
        clients?.forEach((client) => {
            client?.next?.(data);
        });
    }
    /** 推送给所有用户 */
    sendToAllUser(data) {
        clientMap.forEach((client, uid) => {
            this.sendToClients(uid, data);
        });
    }
    /**
     * 通知前端重新获取权限菜单
     * @param uid
     * @constructor
     */
    async noticeClientToUpdateMenusByUserIds(uid) {
        const userIds = [].concat(uid);
        userIds.forEach((uid) => {
            this.sendToClients(uid, { type: 'updatePermsAndMenus' });
        });
    }
    /**
     * 通过menuIds通知用户更新权限菜单
     */
    async noticeClientToUpdateMenusByMenuIds(menuIds) {
        const roleMenus = await RoleEntity.find({
            where: {
                menus: {
                    id: In(menuIds),
                },
            },
        });
        const roleIds = roleMenus.map(n => n.id).concat(ROOT_ROLE_ID);
        await this.noticeClientToUpdateMenusByRoleIds(roleIds);
    }
    /**
     * 通过roleIds通知用户更新权限菜单
     */
    async noticeClientToUpdateMenusByRoleIds(roleIds) {
        const users = await UserEntity.find({
            where: {
                roles: {
                    id: In(roleIds),
                },
            },
        });
        if (users) {
            const userIds = users.map(n => n.id);
            await this.noticeClientToUpdateMenusByUserIds(userIds);
        }
    }
};
SseService = __decorate([
    Injectable()
], SseService);
export { SseService };
//# sourceMappingURL=sse.service.js.map