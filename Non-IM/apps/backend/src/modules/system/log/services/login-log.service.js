import { __decorate, __metadata, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Like, Repository } from 'typeorm';
import UAParser from 'ua-parser-js';
import { paginateRaw } from '~/helper/paginate';
import { getIpAddress } from '~/utils/ip.util';
import { LoginLogEntity } from '../entities/login-log.entity';
async function parseLoginLog(e, parser) {
    const uaResult = parser.setUA(e.login_log_ua).getResult();
    return {
        id: e.login_log_id,
        ip: e.login_log_ip,
        address: e.login_log_address,
        os: `${`${uaResult.os.name ?? ''} `}${uaResult.os.version}`,
        browser: `${`${uaResult.browser.name ?? ''} `}${uaResult.browser.version}`,
        username: e.user_username,
        time: e.login_log_created_at,
    };
}
let LoginLogService = class LoginLogService {
    constructor(loginLogRepository) {
        this.loginLogRepository = loginLogRepository;
    }
    async create(uid, ip, ua) {
        try {
            const address = await getIpAddress(ip);
            await this.loginLogRepository.save({
                ip,
                ua,
                address,
                user: { id: uid },
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    async list({ page, pageSize, username, ip, address, time, }) {
        const queryBuilder = await this.loginLogRepository
            .createQueryBuilder('login_log')
            .innerJoinAndSelect('login_log.user', 'user')
            .where({
            ...(ip && { ip: Like(`%${ip}%`) }),
            ...(address && { address: Like(`%${address}%`) }),
            ...(time && { createdAt: Between(time[0], time[1]) }),
            ...(username && {
                user: {
                    username: Like(`%${username}%`),
                },
            }),
        })
            .orderBy('login_log.created_at', 'DESC');
        const { items, ...rest } = await paginateRaw(queryBuilder, {
            page,
            pageSize,
        });
        const parser = new UAParser();
        const loginLogInfos = await Promise.all(items.map(item => parseLoginLog(item, parser)));
        return {
            items: loginLogInfos,
            ...rest,
        };
    }
    async clearLog() {
        await this.loginLogRepository.clear();
    }
    async clearLogBeforeTime(time) {
        await this.loginLogRepository.delete({ createdAt: LessThan(time) });
    }
};
LoginLogService = __decorate([
    Injectable(),
    __param(0, InjectRepository(LoginLogEntity)),
    __metadata("design:paramtypes", [Repository])
], LoginLogService);
export { LoginLogService };
//# sourceMappingURL=login-log.service.js.map