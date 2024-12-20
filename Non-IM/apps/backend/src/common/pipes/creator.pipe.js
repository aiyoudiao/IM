import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
let CreatorPipe = class CreatorPipe {
    constructor(request) {
        this.request = request;
    }
    transform(value, metadata) {
        const user = this.request.user;
        value.createBy = user.uid;
        return value;
    }
};
CreatorPipe = __decorate([
    Injectable(),
    __param(0, Inject(REQUEST)),
    __metadata("design:paramtypes", [Object])
], CreatorPipe);
export { CreatorPipe };
//# sourceMappingURL=creator.pipe.js.map