import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from '../model/project';
import { ProjectDto } from '../dto';
import { TableEntity } from './table.entity';
import { UUID } from 'crypto';

@Entity('projects')
export class ProjectEntity extends BaseEntity {
	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
	})
	public name: string;

	@OneToMany(() => TableEntity, (table) => table.project, { cascade: true })
	public tables: TableEntity[];

	constructor(id: UUID, name: string) {
		super();
		this.id = id;
		this.name = name;
	}

	public toModel(): Project {
		//todo: need to map table when it's implemented
		return new Project(this.id, this.name, []);
	}

	public toDto(): ProjectDto {
		return {
			id: this.id,
			name: this.name,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
