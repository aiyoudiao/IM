import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable } from '@nestjs/common';
import { REDIS_PUBSUB } from './redis.constant';
import { RedisSubPub } from './redis-subpub';
let RedisPubSubService = class RedisPubSubService {
    constructor(redisSubPub) {
        this.redisSubPub = redisSubPub;
    }
    async publish(event, data) {
        return this.redisSubPub.publish(event, data);
    }
    async subscribe(event, callback) {
        return this.redisSubPub.subscribe(event, callback);
    }
    async unsubscribe(event, callback) {
        return this.redisSubPub.unsubscribe(event, callback);
    }
};
RedisPubSubService = __decorate([
    Injectable(),
    __param(0, Inject(REDIS_PUBSUB)),
    __metadata("design:paramtypes", [RedisSubPub])
], RedisPubSubService);
export { RedisPubSubService };
//# sourceMappingURL=subpub.service.js.map