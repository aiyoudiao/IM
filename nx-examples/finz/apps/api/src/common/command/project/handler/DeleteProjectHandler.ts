import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectEntity } from '../../../entity/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteProject } from '../DeleteProject';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProject)
export class DeleteProjectHandler implements ICommandHandler<DeleteProject> {
	constructor(@InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>) {}

	public async execute(command: DeleteProject): Promise<void> {
		const projectEntity = await this.projectRepository.findOneBy({ id: command.id });
		if (!projectEntity) {
			throw new NotFoundException('Project not found.');
		}
		await this.projectRepository.delete(command.id);
	}
}
