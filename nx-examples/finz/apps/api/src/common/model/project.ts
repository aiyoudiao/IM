import { UUID } from 'crypto';
import { Table } from './table';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectDto } from '../dto';

export class Project {
	public id: UUID;
	public name: string;
	public createdAt: Date;
	public updatedAt: Date;
	public tables: Table[];

	constructor(id: UUID, name: string, tables: Table[]) {
		this.id = id;
		this.name = name;
		this.tables = tables;
	}

	public toEntity(): ProjectEntity {
		return new ProjectEntity(this.id, this.name);
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
