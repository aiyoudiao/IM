import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: UUID;

	@Column({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		name: 'created_at',
	})
	createdAt: Date;

	@Column({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		name: 'updated_at',
	})
	updatedAt: Date;
}
