import { UUID } from 'crypto';

export class PatchProject {
	constructor(public readonly id: UUID, public readonly name?: string) {}
}
