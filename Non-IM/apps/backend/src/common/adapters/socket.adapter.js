import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { REDIS_PUBSUB } from '~/shared/redis/redis.constant';
export const RedisIoAdapterKey = 'm-shop-socket';
export class RedisIoAdapter extends IoAdapter {
    constructor(app) {
        super(app);
        this.app = app;
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        const { pubClient, subClient } = this.app.get(REDIS_PUBSUB);
        const redisAdapter = createAdapter(pubClient, subClient, {
            key: RedisIoAdapterKey,
            requestsTimeout: 10000,
        });
        server.adapter(redisAdapter);
        return server;
    }
}
//# sourceMappingURL=socket.adapter.js.map