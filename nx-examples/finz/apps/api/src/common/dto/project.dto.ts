import { UUID } from 'crypto';

export interface ProjectDto {
	id: UUID;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}
