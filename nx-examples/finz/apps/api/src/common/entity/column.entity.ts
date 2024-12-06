import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TableEntity } from './table.entity';

@Entity('columns')
export class ColumnEntity extends BaseEntity {
	@Column({
		type: 'varchar',
		nullable: false,
	})
	public name: string;

	public table: TableEntity;
}
