import { __decorate } from "tslib";
import { BadRequestException, Injectable, } from '@nestjs/common';
let ParseIntPipe = class ParseIntPipe {
    transform(value, metadata) {
        const val = Number.parseInt(value, 10);
        if (Number.isNaN(val))
            throw new BadRequestException('id validation failed');
        return val;
    }
};
ParseIntPipe = __decorate([
    Injectable()
], ParseIntPipe);
export { ParseIntPipe };
//# sourceMappingURL=parse-int.pipe.js.map