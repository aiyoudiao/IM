import { CreateProjectRequest } from './CreateProjectRequest';
import { TableDto } from '../../common/dto/TableDto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PatchProjectRequest extends PartialType(CreateProjectRequest) {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => TableDto)
	@ApiProperty({ type: [TableDto], description: 'The tables of the project' })
	@IsOptional()
	public tables?: TableDto[];
}
