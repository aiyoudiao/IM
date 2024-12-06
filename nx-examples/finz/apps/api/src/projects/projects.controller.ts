import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { BaseFilter } from '../common/dto/BaseFilter';
import { UUID } from 'crypto';
import { CreateProjectRequest } from './request/CreateProjectRequest';
import { PatchProjectRequest } from './request/PatchProjectRequest';
import { ProjectsService } from './projects.service';
import {
	ApiParam,
	ApiQuery,
	ApiTags,
	ApiOperation,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiInternalServerErrorResponse,
	ApiBody,
	ApiCreatedResponse,
} from '@nestjs/swagger';
import { ProjectCreatedResponse } from './response/ProjectCreatedResponse';
import { ListViewModel, ProjectListItem } from '@finz/lib';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Get()
	@ApiOperation({
		summary: 'Get all projects',
		description: 'Get all projects with pagination',
	})
	@ApiQuery({ name: 'page', type: Number, description: 'Page number', required: false })
	@ApiQuery({ name: 'limit', type: Number, description: 'Number of items per page', required: false })
	@ApiOkResponse({ description: 'Projects fetched successfully' })
	@ApiBadRequestResponse({ description: 'Invalid filter' })
	@ApiNotFoundResponse({ description: 'Projects not found' })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	public async getProjects(@Query() filter: BaseFilter): Promise<ListViewModel<ProjectListItem>> {
		return this.projectsService.findProjects(filter);
	}

	@Post()
	@ApiOperation({
		summary: 'Create a new project',
		description: 'Create a new project with the given name',
	})
	@ApiBody({ type: CreateProjectRequest })
	@ApiCreatedResponse({ description: 'Project created successfully' })
	@ApiBadRequestResponse({ description: 'Invalid request body' })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	public async createProject(@Body() createProjectRequest: CreateProjectRequest): Promise<ProjectCreatedResponse> {
		return this.projectsService.createProject(createProjectRequest);
	}

	@Get(':id')
	@ApiParam({ name: 'id', type: String })
	public getProjectById(@Param('id', ParseUUIDPipe) id: UUID) {
		return { id };
	}

	@Patch(':id')
	@ApiParam({ name: 'id', type: String })
	@ApiBody({ type: PatchProjectRequest })
	@ApiOkResponse({ description: 'Project updated successfully' })
	@ApiBadRequestResponse({ description: 'Invalid request body' })
	@ApiNotFoundResponse({ description: 'Project not found' })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	public async updateProject(@Param('id', ParseUUIDPipe) id: UUID, @Body() patchProjectRequest: PatchProjectRequest) {
		return this.projectsService.patchProject(id, patchProjectRequest);
	}

	@Delete(':id')
	@ApiParam({ name: 'id', type: String })
	@ApiOkResponse({ description: 'Project updated successfully' })
	@ApiNotFoundResponse({ description: 'Project not found' })
	@ApiInternalServerErrorResponse({ description: 'Internal server error' })
	public async deleteProject(@Param('id', ParseUUIDPipe) id: UUID) {
		return this.projectsService.deleteProject(id);
	}
}
