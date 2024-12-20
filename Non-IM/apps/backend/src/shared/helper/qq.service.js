import { __decorate, __metadata } from "tslib";
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
let QQService = class QQService {
    constructor(http) {
        this.http = http;
    }
    async getNickname(qq) {
        const { data } = await this.http.axiosRef.get(`https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${qq}`);
        return data;
    }
    async getAvater(qq) {
        // https://thirdqq.qlogo.cn/headimg_dl?dst_uin=1743369777&spec=640&img_type=jpg
        return `https://thirdqq.qlogo.cn/g?b=qq&s=100&nk=${qq}`;
    }
};
QQService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpService])
], QQService);
export { QQService };
//# sourceMappingURL=qq.service.js.map