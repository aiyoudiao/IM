import { applyDecorators, SetMetadata } from '@nestjs/common';
import { isPlainObject } from 'lodash';
import { PERMISSION_KEY } from '../auth.constant';
/** 资源操作需要特定的权限 */
export function Perm(permission) {
    return applyDecorators(SetMetadata(PERMISSION_KEY, permission));
}
/** (此举非必需)保存通过 definePermission 定义的所有权限，可用于前端开发人员开发阶段的 ts 类型提示，避免前端权限定义与后端定义不匹配 */
let permissions = [];
export function definePermission(modulePrefix, actions) {
    if (isPlainObject(actions)) {
        Object.entries(actions).forEach(([key, action]) => {
            actions[key] = `${modulePrefix}:${action}`;
        });
        permissions = [...new Set([...permissions, ...Object.values(actions)])];
        return actions;
    }
    else if (Array.isArray(actions)) {
        const permissionFormats = actions.map(action => `${modulePrefix}:${action}`);
        permissions = [...new Set([...permissions, ...permissionFormats])];
        return actions.reduce((prev, action) => {
            prev[action.toUpperCase()] = `${modulePrefix}:${action}`;
            return prev;
        }, {});
    }
}
/** 获取所有通过 definePermission 定义的权限 */
export const getDefinePermissions = () => permissions;
//# sourceMappingURL=permission.decorator.js.map