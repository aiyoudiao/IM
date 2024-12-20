import { NotFoundException } from '@nestjs/common';
import { sample } from 'lodash';
export const NotFoundMessage = ['404, Not Found'];
export class CannotFindException extends NotFoundException {
    constructor() {
        super(sample(NotFoundMessage));
    }
}
//# sourceMappingURL=not-found.exception.js.map