import { applyDecorators, SetMetadata } from '@nestjs/common';
import { RESOURCE_KEY } from '../auth.constant';
export function Resource(entity, condition) {
    return applyDecorators(SetMetadata(RESOURCE_KEY, { entity, condition }));
}
//# sourceMappingURL=resource.decorator.js.map