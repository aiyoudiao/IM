import cluster from 'node:cluster';
export const isMainCluster = process.env.NODE_APP_INSTANCE && Number.parseInt(process.env.NODE_APP_INSTANCE) === 0;
export const isMainProcess = cluster.isPrimary || isMainCluster;
export const isDev = process.env.NODE_ENV === 'development';
export const isTest = !!process.env.TEST;
export const cwd = process.cwd();
/**
 * 格式化环境变量
 * @param key 环境变量的键值
 * @param defaultValue 默认值
 * @param callback 格式化函数
 */
function formatValue(key, defaultValue, callback) {
    const value = process.env[key];
    if (typeof value === 'undefined')
        return defaultValue;
    if (!callback)
        return value;
    return callback(value);
}
export function env(key, defaultValue = '') {
    return formatValue(key, defaultValue);
}
export function envString(key, defaultValue = '') {
    return formatValue(key, defaultValue);
}
export function envNumber(key, defaultValue = 0) {
    return formatValue(key, defaultValue, (value) => {
        try {
            return Number(value);
        }
        catch {
            throw new Error(`${key} environment variable is not a number`);
        }
    });
}
export function envBoolean(key, defaultValue = false) {
    return formatValue(key, defaultValue, (value) => {
        try {
            return Boolean(JSON.parse(value));
        }
        catch {
            throw new Error(`${key} environment variable is not a boolean`);
        }
    });
}
//# sourceMappingURL=env.js.map