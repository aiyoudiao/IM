const prefix = 'm-shop';
export function getRedisKey(key, ...concatKeys) {
    return `${prefix}:${key}${concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''}`;
}
//# sourceMappingURL=redis.util.js.map