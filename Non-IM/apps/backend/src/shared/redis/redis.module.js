import { __decorate } from "tslib";
import { RedisModule as NestRedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { REDIS_CLIENT } from '~/common/decorators/inject-redis.decorator';
import { CacheService } from './cache.service';
import { REDIS_PUBSUB } from './redis.constant';
import { RedisSubPub } from './redis-subpub';
import { RedisPubSubService } from './subpub.service';
const providers = [
    CacheService,
    {
        provide: REDIS_PUBSUB,
        useFactory: (configService) => {
            const redisOptions = configService.get('redis');
            return new RedisSubPub(redisOptions);
        },
        inject: [ConfigService],
    },
    RedisPubSubService,
    {
        provide: REDIS_CLIENT,
        useFactory: (redisService) => {
            return redisService.getOrThrow();
        },
        inject: [RedisService], // 注入 RedisService
    },
];
let RedisModule = class RedisModule {
};
RedisModule = __decorate([
    Global(),
    Module({
        imports: [
            // cache
            CacheModule.registerAsync({
                imports: [ConfigModule],
                useFactory: (configService) => {
                    const redisOptions = configService.get('redis');
                    return {
                        isGlobal: true,
                        store: redisStore,
                        isCacheableValue: () => true,
                        ...redisOptions,
                    };
                },
                inject: [ConfigService],
            }),
            // redis
            NestRedisModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService) => ({
                    readyLog: true,
                    config: configService.get('redis'),
                }),
                inject: [ConfigService],
            }),
        ],
        providers,
        exports: [...providers, CacheModule],
    })
], RedisModule);
export { RedisModule };
//# sourceMappingURL=redis.module.js.map