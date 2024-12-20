import { __decorate, __metadata } from "tslib";
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator, } from '@nestjs/terminus';
import { definePermission, Perm } from '../auth/decorators/permission.decorator';
export const PermissionHealth = definePermission('app:health', {
    NETWORK: 'network',
    DB: 'database',
    MH: 'memory-heap',
    MR: 'memory-rss',
    DISK: 'disk',
});
let HealthController = class HealthController {
    constructor(http, db, memory, disk) {
        this.http = http;
        this.db = db;
        this.memory = memory;
        this.disk = disk;
    }
    async checkNetwork() {
        return this.http.pingCheck('buqiyuan', 'https://buqiyuan.gitee.io/');
    }
    async checkDatabase() {
        return this.db.pingCheck('database');
    }
    async checkMemoryHeap() {
        // the process should not use more than 200MB memory
        return this.memory.checkHeap('memory-heap', 200 * 1024 * 1024);
    }
    async checkMemoryRSS() {
        // the process should not have more than 200MB RSS memory allocated
        return this.memory.checkRSS('memory-rss', 200 * 1024 * 1024);
    }
    async checkDisk() {
        return this.disk.checkStorage('disk', {
            // The used disk storage should not exceed 75% of the full disk size
            thresholdPercent: 0.75,
            path: '/',
        });
    }
};
__decorate([
    Get('network'),
    HealthCheck(),
    Perm(PermissionHealth.NETWORK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkNetwork", null);
__decorate([
    Get('database'),
    HealthCheck(),
    Perm(PermissionHealth.DB),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkDatabase", null);
__decorate([
    Get('memory-heap'),
    HealthCheck(),
    Perm(PermissionHealth.MH),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkMemoryHeap", null);
__decorate([
    Get('memory-rss'),
    HealthCheck(),
    Perm(PermissionHealth.MR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkMemoryRSS", null);
__decorate([
    Get('disk'),
    HealthCheck(),
    Perm(PermissionHealth.DISK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkDisk", null);
HealthController = __decorate([
    ApiTags('Health - 健康检查'),
    Controller('health'),
    __metadata("design:paramtypes", [HttpHealthIndicator,
        TypeOrmHealthIndicator,
        MemoryHealthIndicator,
        DiskHealthIndicator])
], HealthController);
export { HealthController };
//# sourceMappingURL=health.controller.js.map