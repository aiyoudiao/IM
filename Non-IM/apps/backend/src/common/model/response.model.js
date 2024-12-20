import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MSG, } from '~/constants/response.constant';
export class ResOp {
    constructor(code, data, message = RESPONSE_SUCCESS_MSG) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
    static success(data, message) {
        return new ResOp(RESPONSE_SUCCESS_CODE, data, message);
    }
    static error(code, message) {
        return new ResOp(code, {}, message);
    }
}
__decorate([
    ApiProperty({ type: 'object' }),
    __metadata("design:type", Object)
], ResOp.prototype, "data", void 0);
__decorate([
    ApiProperty({ type: 'number', default: RESPONSE_SUCCESS_CODE }),
    __metadata("design:type", Number)
], ResOp.prototype, "code", void 0);
__decorate([
    ApiProperty({ type: 'string', default: RESPONSE_SUCCESS_MSG }),
    __metadata("design:type", String)
], ResOp.prototype, "message", void 0);
export class TreeResult {
}
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], TreeResult.prototype, "id", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Number)
], TreeResult.prototype, "parentId", void 0);
__decorate([
    ApiProperty(),
    __metadata("design:type", Array)
], TreeResult.prototype, "children", void 0);
//# sourceMappingURL=response.model.js.map