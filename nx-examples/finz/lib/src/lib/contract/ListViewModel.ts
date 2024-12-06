import { UUID } from 'crypto';

export interface ListViewModel<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
}

export interface ProjectListItem {
	id: UUID;
	name: string;
}
