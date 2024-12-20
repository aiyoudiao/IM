var _a, _b;
import { __decorate, __metadata, __param } from "tslib";
import { Controller, Headers, Ip, Param, ParseIntPipe, Req, Res, Sse } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { FastifyReply, FastifyRequest } from 'fastify';
import { interval, Observable } from 'rxjs';
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { OnlineService } from '../system/online/online.service';
import { SseService } from './sse.service';
let SseController = class SseController {
    constructor(sseService, onlineService) {
        this.sseService = sseService;
        this.onlineService = onlineService;
        this.replyMap = new Map();
    }
    closeAllConnect() {
        this.sseService.sendToAllUser({
            type: 'close',
            data: 'bye~',
        });
        this.replyMap.forEach((reply) => {
            reply.raw.end().destroy();
        });
    }
    // 通过控制台关闭程序时触发
    beforeApplicationShutdown() {
        // console.log('beforeApplicationShutdown')
        this.closeAllConnect();
    }
    async sse(uid, req, res, ip, ua) {
        this.replyMap.set(uid, res);
        this.onlineService.addOnlineUser(req.accessToken, ip, ua);
        return new Observable((subscriber) => {
            // 定时推送，保持连接
            const subscription = interval(12000).subscribe(() => {
                subscriber.next({ type: 'ping' });
            });
            // console.log(`user-${uid}已连接`)
            this.sseService.addClient(uid, subscriber);
            // 当客户端断开连接时
            req.raw.on('close', () => {
                subscription.unsubscribe();
                this.sseService.removeClient(uid, subscriber);
                this.replyMap.delete(uid);
                this.onlineService.removeOnlineUser(req.accessToken);
                console.log(`user-${uid}已关闭`);
            });
        });
    }
};
__decorate([
    ApiOperation({ summary: '服务端推送消息' }),
    Sse(':uid'),
    __param(0, Param('uid', ParseIntPipe)),
    __param(1, Req()),
    __param(2, Res()),
    __param(3, Ip()),
    __param(4, Headers('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_a = typeof FastifyRequest !== "undefined" && FastifyRequest) === "function" ? _a : Object, typeof (_b = typeof FastifyReply !== "undefined" && FastifyReply) === "function" ? _b : Object, String, String]),
    __metadata("design:returntype", Promise)
], SseController.prototype, "sse", null);
SseController = __decorate([
    ApiTags('System - sse模块'),
    ApiSecurityAuth(),
    SkipThrottle(),
    Controller('sse'),
    __metadata("design:paramtypes", [SseService, OnlineService])
], SseController);
export { SseController };
//# sourceMappingURL=sse.controller.js.map