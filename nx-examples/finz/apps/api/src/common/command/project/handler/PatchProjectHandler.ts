import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectEntity } from '../../../entity/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from '../../../dto';
import { PatchProject } from '../PatchProject';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(PatchProject)
export class PatchProjectHandler implements ICommandHandler<PatchProject> {
	constructor(@InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>) {}

	public async execute(command: PatchProject): Promise<ProjectDto> {
		let projectEntity = await this.projectRepository.findOneBy({ id: command.id });
		if (!projectEntity) {
			throw new NotFoundException('Project not found.');
		}
		const project = projectEntity.toModel();
		project.name = command.name;
		projectEntity = await this.projectRepository.save(project.toEntity());
		return projectEntity.toDto();
	}
}
