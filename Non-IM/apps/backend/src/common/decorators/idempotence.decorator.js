import { SetMetadata } from '@nestjs/common';
export const HTTP_IDEMPOTENCE_KEY = Symbol('__idempotence_key__');
export const HTTP_IDEMPOTENCE_OPTIONS = Symbol('__idempotence_options__');
/**
 * 幂等
 */
export function Idempotence(options) {
    return function (target, key, descriptor) {
        SetMetadata(HTTP_IDEMPOTENCE_OPTIONS, options || {})(descriptor.value);
    };
}
//# sourceMappingURL=idempotence.decorator.js.map