import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ColumnDto } from './ColumnDto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TableDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ type: String, description: 'The name of the table' })
	public name: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ColumnDto)
	@ApiProperty({ type: [ColumnDto], description: 'The columns of the table' })
	public columns: ColumnDto[];
}
