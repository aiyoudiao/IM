import { __decorate, __metadata, __param } from "tslib";
import { Body, Controller, Delete, Get, Patch, Post, Put, Query, } from '@nestjs/common';
import { ApiBody, IntersectionType, PartialType } from '@nestjs/swagger';
import { upperFirst } from 'lodash';
import pluralize from 'pluralize';
import { ApiResult } from '~/common/decorators/api-result.decorator';
import { IdParam } from '~/common/decorators/id-param.decorator';
import { PagerDto } from '~/common/dto/pager.dto';
export function BaseCrudFactory({ entity, dto, permissions }) {
    const prefix = entity.name.toLowerCase().replace(/entity$/, '');
    const pluralizeName = pluralize(prefix);
    dto = dto ?? class extends entity {
    };
    class Dto extends dto {
    }
    Dto.name = upperFirst(`${pluralizeName}Dto`);
    class UpdateDto extends PartialType(Dto) {
    }
    UpdateDto.name = upperFirst(`${pluralizeName}UpdateDto`);
    class QueryDto extends IntersectionType(PagerDto, PartialType(Dto)) {
    }
    QueryDto.name = upperFirst(`${pluralizeName}QueryDto`);
    permissions = permissions ?? {
        LIST: `${prefix}:list`,
        CREATE: `${prefix}:create`,
        READ: `${prefix}:read`,
        UPDATE: `${prefix}:update`,
        DELETE: `${prefix}:delete`,
    };
    let BaseController = class BaseController {
        constructor(service) {
            this.service = service;
        }
        async list(pager) {
            return await this.service.list(pager);
        }
        async get(id) {
            return await this.service.findOne(id);
        }
        async create(dto) {
            return await this.service.create(dto);
        }
        async update(id, dto) {
            return await this.service.update(id, dto);
        }
        async patch(id, dto) {
            await this.service.update(id, dto);
        }
        async delete(id) {
            await this.service.delete(id);
        }
    };
    __decorate([
        Get(),
        ApiResult({ type: [entity], isPage: true }),
        __param(0, Query()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [QueryDto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "list", null);
    __decorate([
        Get(':id'),
        ApiResult({ type: entity }),
        __param(0, IdParam()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "get", null);
    __decorate([
        Post(),
        ApiBody({ type: dto }),
        __param(0, Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Dto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "create", null);
    __decorate([
        Put(':id'),
        __param(0, IdParam()),
        __param(1, Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, UpdateDto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "update", null);
    __decorate([
        Patch(':id'),
        __param(0, IdParam()),
        __param(1, Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, UpdateDto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "patch", null);
    __decorate([
        Delete(':id'),
        __param(0, IdParam()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "delete", null);
    BaseController = __decorate([
        Controller(pluralizeName),
        __metadata("design:paramtypes", [Object])
    ], BaseController);
    return BaseController;
}
//# sourceMappingURL=crud.factory.js.map