import { Transform } from 'class-transformer';
import { castArray, isArray, isNil, trim } from 'lodash';
/**
 * convert string to number
 */
export function ToNumber() {
    return Transform((params) => {
        const value = params.value;
        if (isArray(value))
            return value.map(v => Number(v));
        return Number(value);
    }, { toClassOnly: true });
}
/**
 * convert string to int
 */
export function ToInt() {
    return Transform((params) => {
        const value = params.value;
        if (isArray(value))
            return value.map(v => Number.parseInt(v));
        return Number.parseInt(value);
    }, { toClassOnly: true });
}
/**
 * convert string to boolean
 */
export function ToBoolean() {
    return Transform((params) => {
        switch (params.value) {
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                return params.value;
        }
    }, { toClassOnly: true });
}
/**
 * convert string to Date
 */
export function ToDate() {
    return Transform((params) => {
        const { value } = params;
        if (!value)
            return;
        return new Date(value);
    }, { toClassOnly: true });
}
/**
 * transforms to array, specially for query params
 */
export function ToArray() {
    return Transform((params) => {
        const { value } = params;
        if (isNil(value))
            return [];
        return castArray(value);
    }, { toClassOnly: true });
}
/**
 * trim spaces from start and end, replace multiple spaces with one.
 */
export function ToTrim() {
    return Transform((params) => {
        const value = params.value;
        if (isArray(value))
            return value.map(v => trim(v));
        return trim(value);
    }, { toClassOnly: true });
}
/**
 * lowercase value
 */
export function ToLowerCase() {
    return Transform((params) => {
        const value = params.value;
        if (!value)
            return;
        if (isArray(value))
            return value.map(v => v.toLowerCase());
        return value.toLowerCase();
    }, { toClassOnly: true });
}
/**
 * uppercase value
 */
export function ToUpperCase() {
    return Transform((params) => {
        const value = params.value;
        if (!value)
            return;
        if (isArray(value))
            return value.map(v => v.toUpperCase());
        return value.toUpperCase();
    }, { toClassOnly: true });
}
//# sourceMappingURL=transform.decorator.js.map