import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProject } from '../CreateProject';
import { Project } from '../../../model/project';
import { ProjectEntity } from '../../../entity/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from '../../../dto';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';

@CommandHandler(CreateProject)
export class CreateProjectHandler implements ICommandHandler<CreateProject> {
	constructor(@InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>) {}

	public async execute(command: CreateProject): Promise<ProjectDto> {
		const project = (
			await this.projectRepository.save(new Project(uuidv4() as UUID, command.name, []).toEntity())
		).toModel();
		return project.toDto();
	}
}
