import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import Redis from 'ioredis';
import { InjectRedis } from '~/common/decorators/inject-redis.decorator';
import { SecurityConfig } from '~/config';
import { genOnlineUserKey } from '~/helper/genRedisKey';
import { RoleService } from '~/modules/system/role/role.service';
import { generateUUID } from '~/utils';
import { AccessTokenEntity } from '../entities/access-token.entity';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
/**
 * 令牌服务
 */
let TokenService = class TokenService {
    constructor(jwtService, roleService, redis, securityConfig) {
        this.jwtService = jwtService;
        this.roleService = roleService;
        this.redis = redis;
        this.securityConfig = securityConfig;
    }
    /**
     * 根据accessToken刷新AccessToken与RefreshToken
     * @param accessToken
     */
    async refreshToken(accessToken) {
        const { user, refreshToken } = accessToken;
        if (refreshToken) {
            const now = dayjs();
            // 判断refreshToken是否过期
            if (now.isAfter(refreshToken.expired_at))
                return null;
            const roleIds = await this.roleService.getRoleIdsByUser(user.id);
            const roleValues = await this.roleService.getRoleValues(roleIds);
            // 如果没过期则生成新的access_token和refresh_token
            const token = await this.generateAccessToken(user.id, roleValues);
            await accessToken.remove();
            return token;
        }
        return null;
    }
    generateJwtSign(payload) {
        const jwtSign = this.jwtService.sign(payload);
        return jwtSign;
    }
    async generateAccessToken(uid, roles = []) {
        const payload = {
            uid,
            pv: 1,
            roles,
        };
        const jwtSign = await this.jwtService.signAsync(payload);
        // 生成accessToken
        const accessToken = new AccessTokenEntity();
        accessToken.value = jwtSign;
        accessToken.user = { id: uid };
        accessToken.expired_at = dayjs()
            .add(this.securityConfig.jwtExprire, 'second')
            .toDate();
        await accessToken.save();
        // 生成refreshToken
        const refreshToken = await this.generateRefreshToken(accessToken, dayjs());
        return {
            accessToken: jwtSign,
            refreshToken,
        };
    }
    /**
     * 生成新的RefreshToken并存入数据库
     * @param accessToken
     * @param now
     */
    async generateRefreshToken(accessToken, now) {
        const refreshTokenPayload = {
            uuid: generateUUID(),
        };
        const refreshTokenSign = await this.jwtService.signAsync(refreshTokenPayload, {
            secret: this.securityConfig.refreshSecret,
        });
        const refreshToken = new RefreshTokenEntity();
        refreshToken.value = refreshTokenSign;
        refreshToken.expired_at = now
            .add(this.securityConfig.refreshExpire, 'second')
            .toDate();
        refreshToken.accessToken = accessToken;
        await refreshToken.save();
        return refreshTokenSign;
    }
    /**
     * 检查accessToken是否存在，并且是否处于有效期内
     * @param value
     */
    async checkAccessToken(value) {
        let isValid = false;
        try {
            await this.verifyAccessToken(value);
            const res = await AccessTokenEntity.findOne({
                where: { value },
                relations: ['user', 'refreshToken'],
                cache: true,
            });
            isValid = Boolean(res);
        }
        catch (error) { }
        return isValid;
    }
    /**
     * 移除AccessToken且自动移除关联的RefreshToken
     * @param value
     */
    async removeAccessToken(value) {
        const accessToken = await AccessTokenEntity.findOne({
            where: { value },
        });
        if (accessToken) {
            this.redis.del(genOnlineUserKey(accessToken.id));
            await accessToken.remove();
        }
    }
    /**
     * 移除RefreshToken
     * @param value
     */
    async removeRefreshToken(value) {
        const refreshToken = await RefreshTokenEntity.findOne({
            where: { value },
            relations: ['accessToken'],
        });
        if (refreshToken) {
            if (refreshToken.accessToken)
                this.redis.del(genOnlineUserKey(refreshToken.accessToken.id));
            await refreshToken.accessToken.remove();
            await refreshToken.remove();
        }
    }
    /**
     * 验证Token是否正确,如果正确则返回所属用户对象
     * @param token
     */
    async verifyAccessToken(token) {
        return this.jwtService.verifyAsync(token);
    }
};
TokenService = __decorate([
    Injectable(),
    __param(2, InjectRedis()),
    __param(3, Inject(SecurityConfig.KEY)),
    __metadata("design:paramtypes", [JwtService,
        RoleService,
        Redis, Object])
], TokenService);
export { TokenService };
//# sourceMappingURL=token.service.js.map