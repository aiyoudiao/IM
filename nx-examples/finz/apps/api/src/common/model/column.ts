import { PropertyState } from '@finz/lib';
import { UUID } from 'crypto';

export class Column {
	public id: UUID;
	public tableId: UUID;
	public name: string;
	public createdAt: Date;
	public updatedAt: Date;
	public state: PropertyState;
}
