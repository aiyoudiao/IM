import { Logger } from '@nestjs/common';
import IORedis from 'ioredis';
export class RedisSubPub {
    constructor(redisConfig, channelPrefix = 'm-shop-channel#') {
        this.redisConfig = redisConfig;
        this.channelPrefix = channelPrefix;
        this.ctc = new WeakMap();
        this.init();
    }
    init() {
        const redisOptions = {
            host: this.redisConfig.host,
            port: this.redisConfig.port,
        };
        if (this.redisConfig.password)
            redisOptions.password = this.redisConfig.password;
        const pubClient = new IORedis(redisOptions);
        const subClient = pubClient.duplicate();
        this.pubClient = pubClient;
        this.subClient = subClient;
    }
    async publish(event, data) {
        const channel = this.channelPrefix + event;
        const _data = JSON.stringify(data);
        if (event !== 'log')
            Logger.debug(`发布事件：${channel} <- ${_data}`, RedisSubPub.name);
        await this.pubClient.publish(channel, _data);
    }
    async subscribe(event, callback) {
        const myChannel = this.channelPrefix + event;
        this.subClient.subscribe(myChannel);
        const cb = (channel, message) => {
            if (channel === myChannel) {
                if (event !== 'log')
                    Logger.debug(`接收事件：${channel} -> ${message}`, RedisSubPub.name);
                callback(JSON.parse(message));
            }
        };
        this.ctc.set(callback, cb);
        this.subClient.on('message', cb);
    }
    async unsubscribe(event, callback) {
        const channel = this.channelPrefix + event;
        this.subClient.unsubscribe(channel);
        const cb = this.ctc.get(callback);
        if (cb) {
            this.subClient.off('message', cb);
            this.ctc.delete(callback);
        }
    }
}
//# sourceMappingURL=redis-subpub.js.map