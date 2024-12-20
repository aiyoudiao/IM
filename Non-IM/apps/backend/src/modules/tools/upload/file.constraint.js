import { __decorate } from "tslib";
import { registerDecorator, ValidatorConstraint, } from 'class-validator';
import { has, isArray } from 'lodash';
function checkFileAndLimit(file, limits = {}) {
    if (!('mimetype' in file))
        return false;
    if (limits.mimetypes && !limits.mimetypes.includes(file.mimetype))
        return false;
    if (has(file, '_buf')
        && Buffer.byteLength(file._buf) > limits.fileSize) {
        return false;
    }
    return true;
}
let FileConstraint = class FileConstraint {
    validate(value, args) {
        const [limits = {}] = args.constraints;
        const values = args.object[args.property];
        const filesLimit = limits.files ?? 0;
        if (filesLimit > 0 && isArray(values) && values.length > filesLimit)
            return false;
        return checkFileAndLimit(value, limits);
    }
    defaultMessage(_args) {
        return `The file which to upload's conditions are not met`;
    }
};
FileConstraint = __decorate([
    ValidatorConstraint({ name: 'isFile' })
], FileConstraint);
export { FileConstraint };
/**
 * 图片验证规则
 * @param limits 限制选项
 * @param validationOptions class-validator选项
 */
export function IsFile(limits, validationOptions) {
    return (object, propertyName) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [limits],
            validator: FileConstraint,
        });
    };
}
//# sourceMappingURL=file.constraint.js.map