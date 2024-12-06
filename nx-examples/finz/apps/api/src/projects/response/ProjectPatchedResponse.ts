import { UUID } from 'crypto';

/**
 * Response for project patched
 */
export interface ProjectPatchedResponse {
	/**
	 * Project id
	 */
	id: UUID;
	/**
	 * Project name
	 */
	name: string;
	/**
	 * Project updated at
	 */
	updatedAt: Date;
}
