import { UUID } from 'crypto';

export class DeleteProject {
	constructor(public readonly id: UUID) {}
}
