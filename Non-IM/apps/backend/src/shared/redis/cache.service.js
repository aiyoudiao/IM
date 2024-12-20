import { __decorate, __metadata, __param } from "tslib";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Emitter } from '@socket.io/redis-emitter';
import { RedisIoAdapterKey } from '~/common/adapters/socket.adapter';
import { API_CACHE_PREFIX } from '~/constants/cache.constant';
import { getRedisKey } from '~/utils/redis.util';
let CacheService = class CacheService {
    constructor(cache) {
        this.cache = cache;
    }
    get redisClient() {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        return this.cache.store.client;
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value, milliseconds) {
        return this.cache.set(key, value, milliseconds);
    }
    getClient() {
        return this.redisClient;
    }
    get emitter() {
        if (this._emitter)
            return this._emitter;
        this._emitter = new Emitter(this.redisClient, {
            key: RedisIoAdapterKey,
        });
        return this._emitter;
    }
    async cleanCatch() {
        const redis = this.getClient();
        const keys = await redis.keys(`${API_CACHE_PREFIX}*`);
        await Promise.all(keys.map(key => redis.del(key)));
    }
    async cleanAllRedisKey() {
        const redis = this.getClient();
        const keys = await redis.keys(getRedisKey('*'));
        await Promise.all(keys.map(key => redis.del(key)));
    }
};
CacheService = __decorate([
    Injectable(),
    __param(0, Inject(CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheService);
export { CacheService };
//# sourceMappingURL=cache.service.js.map