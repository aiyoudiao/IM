import { RedisKeys } from '~/constants/cache.constant';
/** 生成验证码 redis key */
export function genCaptchaImgKey(val) {
    return `${RedisKeys.CAPTCHA_IMG_PREFIX}${String(val)}`;
}
/** 生成 auth token redis key */
export function genAuthTokenKey(val) {
    return `${RedisKeys.AUTH_TOKEN_PREFIX}${String(val)}`;
}
/** 生成 auth permission redis key */
export function genAuthPermKey(val) {
    return `${RedisKeys.AUTH_PERM_PREFIX}${String(val)}`;
}
/** 生成 auth passwordVersion redis key */
export function genAuthPVKey(val) {
    return `${RedisKeys.AUTH_PASSWORD_V_PREFIX}${String(val)}`;
}
/** 生成 online user redis key */
export function genOnlineUserKey(tokenId) {
    return `${RedisKeys.ONLINE_USER_PREFIX}${String(tokenId)}`;
}
/** 生成 token blacklist redis key */
export function genTokenBlacklistKey(tokenId) {
    return `${RedisKeys.TOKEN_BLACKLIST_PREFIX}${String(tokenId)}`;
}
//# sourceMappingURL=genRedisKey.js.map