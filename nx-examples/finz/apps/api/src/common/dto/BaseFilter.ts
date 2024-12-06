import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { IBaseFilter } from '@finz/lib';

export class BaseFilter implements IBaseFilter {
	@IsInt()
	@Type(() => Number)
	public page = 0;

	@IsInt()
	@Type(() => Number)
	public limit = 10;
}
