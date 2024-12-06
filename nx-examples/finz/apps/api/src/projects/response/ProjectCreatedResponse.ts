import { UUID } from 'crypto';

/**
 * Response for project created
 */
export interface ProjectCreatedResponse {
	/**
	 * Project id
	 */
	id: UUID;
	/**
	 * Project name
	 */
	name: string;
	/**
	 * Project created at
	 */
	createdAt: Date;
	/**
	 * Project updated at
	 */
	updatedAt: Date;
}
