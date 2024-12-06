import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProjects } from '../GetProjects';
import { ProjectEntity } from '../../../entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListViewModel, ProjectListItem } from '@finz/lib';

@QueryHandler(GetProjects)
export class GetProjectsHandler implements IQueryHandler<GetProjects> {
	constructor(@InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>) {}

	public async execute(query: GetProjects): Promise<ListViewModel<ProjectListItem>> {
		const [projects, total] = await this.projectRepository
			.createQueryBuilder('project')
			.orderBy('project.updatedAt', 'DESC')
			.select(['project.id', 'project.name'])
			.skip(query.filter.page * query.filter.limit)
			.take(query.filter.limit)
			.getManyAndCount();

		return {
			items: projects.map((p) => ({
				id: p.id,
				name: p.name,
			})),
			total: total,
			page: query.filter.page,
			limit: query.filter.limit,
		};
	}
}
