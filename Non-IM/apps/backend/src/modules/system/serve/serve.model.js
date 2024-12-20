import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
export class Runtime {
}
__decorate([
    ApiProperty({ description: '系统' }),
    __metadata("design:type", String)
], Runtime.prototype, "os", void 0);
__decorate([
    ApiProperty({ description: '服务器架构' }),
    __metadata("design:type", String)
], Runtime.prototype, "arch", void 0);
__decorate([
    ApiProperty({ description: 'Node版本' }),
    __metadata("design:type", String)
], Runtime.prototype, "nodeVersion", void 0);
__decorate([
    ApiProperty({ description: 'Npm版本' }),
    __metadata("design:type", String)
], Runtime.prototype, "npmVersion", void 0);
export class CoreLoad {
}
__decorate([
    ApiProperty({ description: '当前CPU资源消耗' }),
    __metadata("design:type", Number)
], CoreLoad.prototype, "rawLoad", void 0);
__decorate([
    ApiProperty({ description: '当前空闲CPU资源' }),
    __metadata("design:type", Number)
], CoreLoad.prototype, "rawLoadIdle", void 0);
// Intel(R) Xeon(R) Platinum 8163 CPU @ 2.50GHz
export class Cpu {
}
__decorate([
    ApiProperty({ description: '制造商' }),
    __metadata("design:type", String)
], Cpu.prototype, "manufacturer", void 0);
__decorate([
    ApiProperty({ description: '品牌' }),
    __metadata("design:type", String)
], Cpu.prototype, "brand", void 0);
__decorate([
    ApiProperty({ description: '物理核心数' }),
    __metadata("design:type", Number)
], Cpu.prototype, "physicalCores", void 0);
__decorate([
    ApiProperty({ description: '型号' }),
    __metadata("design:type", String)
], Cpu.prototype, "model", void 0);
__decorate([
    ApiProperty({ description: '速度 in GHz' }),
    __metadata("design:type", Number)
], Cpu.prototype, "speed", void 0);
__decorate([
    ApiProperty({ description: 'CPU资源消耗 原始滴答' }),
    __metadata("design:type", Number)
], Cpu.prototype, "rawCurrentLoad", void 0);
__decorate([
    ApiProperty({ description: '空闲CPU资源 原始滴答' }),
    __metadata("design:type", Number)
], Cpu.prototype, "rawCurrentLoadIdle", void 0);
__decorate([
    ApiProperty({ description: 'cpu资源消耗', type: [CoreLoad] }),
    __metadata("design:type", Array)
], Cpu.prototype, "coresLoad", void 0);
export class Disk {
}
__decorate([
    ApiProperty({ description: '磁盘空间大小 (bytes)' }),
    __metadata("design:type", Number)
], Disk.prototype, "size", void 0);
__decorate([
    ApiProperty({ description: '已使用磁盘空间 (bytes)' }),
    __metadata("design:type", Number)
], Disk.prototype, "used", void 0);
__decorate([
    ApiProperty({ description: '可用磁盘空间 (bytes)' }),
    __metadata("design:type", Number)
], Disk.prototype, "available", void 0);
export class Memory {
}
__decorate([
    ApiProperty({ description: 'total memory in bytes' }),
    __metadata("design:type", Number)
], Memory.prototype, "total", void 0);
__decorate([
    ApiProperty({ description: '可用内存' }),
    __metadata("design:type", Number)
], Memory.prototype, "available", void 0);
/**
 * 系统信息
 */
export class ServeStatInfo {
}
__decorate([
    ApiProperty({ description: '运行环境', type: Runtime }),
    __metadata("design:type", Runtime)
], ServeStatInfo.prototype, "runtime", void 0);
__decorate([
    ApiProperty({ description: 'CPU信息', type: Cpu }),
    __metadata("design:type", Cpu)
], ServeStatInfo.prototype, "cpu", void 0);
__decorate([
    ApiProperty({ description: '磁盘信息', type: Disk }),
    __metadata("design:type", Disk)
], ServeStatInfo.prototype, "disk", void 0);
__decorate([
    ApiProperty({ description: '内存信息', type: Memory }),
    __metadata("design:type", Memory)
], ServeStatInfo.prototype, "memory", void 0);
//# sourceMappingURL=serve.model.js.map