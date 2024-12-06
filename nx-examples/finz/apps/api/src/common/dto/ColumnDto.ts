import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ type: String, description: 'The name of the column' })
	public name: string;
}
