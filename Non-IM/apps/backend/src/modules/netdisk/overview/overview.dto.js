import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
export class SpaceInfo {
}
__decorate([
    ApiProperty({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], SpaceInfo.prototype, "times", void 0);
__decorate([
    ApiProperty({ description: '对应天数的容量, byte单位', type: [Number] }),
    __metadata("design:type", Array)
], SpaceInfo.prototype, "datas", void 0);
export class CountInfo {
}
__decorate([
    ApiProperty({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], CountInfo.prototype, "times", void 0);
__decorate([
    ApiProperty({ description: '对应天数的文件数量', type: [Number] }),
    __metadata("design:type", Array)
], CountInfo.prototype, "datas", void 0);
export class FlowInfo {
}
__decorate([
    ApiProperty({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], FlowInfo.prototype, "times", void 0);
__decorate([
    ApiProperty({ description: '对应天数的耗费流量', type: [Number] }),
    __metadata("design:type", Array)
], FlowInfo.prototype, "datas", void 0);
export class HitInfo {
}
__decorate([
    ApiProperty({ description: '当月的X号', type: [Number] }),
    __metadata("design:type", Array)
], HitInfo.prototype, "times", void 0);
__decorate([
    ApiProperty({ description: '对应天数的Get请求次数', type: [Number] }),
    __metadata("design:type", Array)
], HitInfo.prototype, "datas", void 0);
export class OverviewSpaceInfo {
}
__decorate([
    ApiProperty({ description: '当前使用容量' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "spaceSize", void 0);
__decorate([
    ApiProperty({ description: '当前文件数量' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "fileSize", void 0);
__decorate([
    ApiProperty({ description: '当天使用流量' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "flowSize", void 0);
__decorate([
    ApiProperty({ description: '当天请求次数' }),
    __metadata("design:type", Number)
], OverviewSpaceInfo.prototype, "hitSize", void 0);
__decorate([
    ApiProperty({ description: '流量趋势，从当月1号开始计算', type: FlowInfo }),
    __metadata("design:type", FlowInfo)
], OverviewSpaceInfo.prototype, "flowTrend", void 0);
__decorate([
    ApiProperty({ description: '容量趋势，从当月1号开始计算', type: SpaceInfo }),
    __metadata("design:type", SpaceInfo)
], OverviewSpaceInfo.prototype, "sizeTrend", void 0);
//# sourceMappingURL=overview.dto.js.map