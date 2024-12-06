import { BaseFilter } from '../../dto/BaseFilter';

export class GetProjects {
	constructor(public readonly filter: BaseFilter) {}
}
