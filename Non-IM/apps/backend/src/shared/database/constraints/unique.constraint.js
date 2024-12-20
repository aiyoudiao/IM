import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidatorConstraint, } from 'class-validator';
import { isNil, merge } from 'lodash';
import { ClsService } from 'nestjs-cls';
import { DataSource, Not } from 'typeorm';
/**
 * 验证某个字段的唯一性
 */
let UniqueConstraint = class UniqueConstraint {
    constructor(dataSource, cls) {
        this.dataSource = dataSource;
        this.cls = cls;
    }
    async validate(value, args) {
        // 获取要验证的模型和字段
        const config = {
            field: args.property,
        };
        const condition = ('entity' in args.constraints[0]
            ? merge(config, args.constraints[0])
            : {
                ...config,
                entity: args.constraints[0],
            });
        if (!condition.entity)
            return false;
        try {
            // 查询是否存在数据,如果已经存在则验证失败
            const repo = this.dataSource.getRepository(condition.entity);
            // 如果没有传自定义的错误信息，则尝试获取该字段的 comment 作为信息提示
            if (!condition.message) {
                const targetColumn = repo.metadata.columns.find(n => n.propertyName === condition.field);
                if (targetColumn?.comment) {
                    args.constraints[0].message = `已存在相同的${targetColumn.comment}`;
                }
            }
            let andWhere = {};
            const operateId = this.cls.get('operateId');
            // 如果是编辑操作，则排除自身
            if (Number.isInteger(operateId)) {
                andWhere = { id: Not(operateId) };
            }
            return isNil(await repo.findOne({
                where: { [condition.field]: value, ...andWhere },
            }));
        }
        catch (err) {
            // 如果数据库操作异常则验证失败
            return false;
        }
    }
    defaultMessage(args) {
        const { entity, field, message } = args.constraints[0];
        const queryProperty = field ?? args.property;
        // if (!(args.object as any).getManager)
        //   return 'getManager function not been found!'
        if (!entity)
            return 'Model not been specified!';
        if (message) {
            return message;
        }
        // return `${queryProperty} of ${entity.name} must been unique!`
        return `${queryProperty} of ${entity.name} must been unique!`;
    }
};
UniqueConstraint = __decorate([
    ValidatorConstraint({ name: 'entityItemUnique', async: true }),
    Injectable(),
    __metadata("design:paramtypes", [DataSource, ClsService])
], UniqueConstraint);
export { UniqueConstraint };
function IsUnique(params, validationOptions) {
    return (object, propertyName) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [params],
            validator: UniqueConstraint,
        });
    };
}
export { IsUnique };
//# sourceMappingURL=unique.constraint.js.map