import { Injectable } from '@nestjs/common';
import { BaseFilter } from '../common/dto/BaseFilter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectRequest } from './request/CreateProjectRequest';
import { CreateProject } from '../common/command/project/CreateProject';
import { ProjectCreatedResponse } from './response/ProjectCreatedResponse';
import { ProjectDto } from '../common/dto';
import { GetProjects } from '../common/query/project/GetProjects';
import { PatchProjectRequest } from './request/PatchProjectRequest';
import { UUID } from 'crypto';
import { PatchProject } from '../common/command/project/PatchProject';
import { ProjectPatchedResponse } from './response/ProjectPatchedResponse';
import { ListViewModel, ProjectListItem } from '@finz/lib';
import { DeleteProject } from '../common/command/project/DeleteProject';

@Injectable()
export class ProjectsService {
	constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

	public async findProjects(filter: BaseFilter): Promise<ListViewModel<ProjectListItem>> {
		const command = new GetProjects(filter);
		const projects = await this.queryBus.execute<GetProjects, ListViewModel<ProjectListItem>>(command);
		return projects;
	}

	public async createProject(request: CreateProjectRequest): Promise<ProjectCreatedResponse> {
		const command = new CreateProject(request.name);
		const projectDto = await this.commandBus.execute<CreateProject, ProjectDto>(command);
		return {
			id: projectDto.id,
			name: projectDto.name,
			createdAt: projectDto.createdAt,
			updatedAt: projectDto.updatedAt,
		} as ProjectCreatedResponse;
	}

	public async patchProject(id: UUID, request: PatchProjectRequest): Promise<ProjectPatchedResponse> {
		const command = new PatchProject(id, request.name);
		console.log(command);
		const projectDto = await this.commandBus.execute<PatchProject, ProjectDto>(command);
		return {
			id: projectDto.id,
			name: projectDto.name,
			updatedAt: projectDto.updatedAt,
		} as ProjectPatchedResponse;
	}

	public async deleteProject(id: UUID): Promise<unknown> {
		return this.commandBus.execute<DeleteProject>(new DeleteProject(id));
	}
}
