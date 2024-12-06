import { UUID } from 'crypto';
import { Column } from './column';
import { TableState } from '@finz/lib';

export class Table {
	public id: UUID;
	public projectId: UUID;
	public name: string;
	public createdAt: Date;
	public updatedAt: Date;
	public columns: Column[];
	public state: TableState;
}
