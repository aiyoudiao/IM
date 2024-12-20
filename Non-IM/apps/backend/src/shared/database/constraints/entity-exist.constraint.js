import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidatorConstraint, } from 'class-validator';
import { DataSource } from 'typeorm';
/**
 * 查询某个字段的值是否在数据表中存在
 */
let EntityExistConstraint = class EntityExistConstraint {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async validate(value, args) {
        let repo;
        if (!value)
            return true;
        // 默认对比字段是id
        let field = 'id';
        // 通过传入的 entity 获取其 repository
        if ('entity' in args.constraints[0]) {
            // 传入的是对象 可以指定对比字段
            field = args.constraints[0].field ?? 'id';
            repo = this.dataSource.getRepository(args.constraints[0].entity);
        }
        else {
            // 传入的是实体类
            repo = this.dataSource.getRepository(args.constraints[0]);
        }
        // 通过查询记录是否存在进行验证
        const item = await repo.findOne({ where: { [field]: value } });
        return !!item;
    }
    defaultMessage(args) {
        if (!args.constraints[0])
            return 'Model not been specified!';
        return `All instance of ${args.constraints[0].name} must been exists in databse!`;
    }
};
EntityExistConstraint = __decorate([
    ValidatorConstraint({ name: 'entityItemExist', async: true }),
    Injectable(),
    __metadata("design:paramtypes", [DataSource])
], EntityExistConstraint);
export { EntityExistConstraint };
function IsEntityExist(condition, validationOptions) {
    return (object, propertyName) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [condition],
            validator: EntityExistConstraint,
        });
    };
}
export { IsEntityExist };
//# sourceMappingURL=entity-exist.constraint.js.map