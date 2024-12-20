import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
let UpdaterPipe = class UpdaterPipe {
    constructor(request) {
        this.request = request;
    }
    transform(value, metadata) {
        const user = this.request.user;
        value.updateBy = user.uid;
        return value;
    }
};
UpdaterPipe = __decorate([
    Injectable(),
    __param(0, Inject(REQUEST)),
    __metadata("design:paramtypes", [Object])
], UpdaterPipe);
export { UpdaterPipe };
//# sourceMappingURL=updater.pipe.js.map