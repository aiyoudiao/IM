import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectRequest {
	@IsNotEmpty()
	@ApiProperty({ description: 'The name of the project' })
	public name: string;
}
