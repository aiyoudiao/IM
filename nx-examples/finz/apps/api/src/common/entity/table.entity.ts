import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { BaseEntity } from './base.entity';
import { ColumnEntity } from './column.entity';

@Entity('tables')
export class TableEntity extends BaseEntity {
	@Column({
		type: 'varchar',
		nullable: false,
	})
	public name: string;

	public project: ProjectEntity;

	@OneToMany(() => ColumnEntity, (column) => column.table, { cascade: true })
	public columns: ColumnEntity[];
}
