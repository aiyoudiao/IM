import { __decorate, __metadata } from "tslib";
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
export class BatchDeleteDto {
}
__decorate([
    IsDefined(),
    IsNotEmpty(),
    IsNumber({}, { each: true }),
    __metadata("design:type", Array)
], BatchDeleteDto.prototype, "ids", void 0);
//# sourceMappingURL=delete.dto.js.map