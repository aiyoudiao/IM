import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { CreateProjectHandler } from '../common/command/project/handler/CreateProjectHandler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../common/entity';
import { GetProjectsHandler } from '../common/query/project/handler/GetProjectsHandler';
import { TableEntity } from '../common/entity/table.entity';
import { PatchProjectHandler } from '../common/command/project/handler/PatchProjectHandler';
import { DeleteProjectHandler } from '../common/command/project/handler/DeleteProjectHandler';
import { ColumnEntity } from '../common/entity/column.entity';

const commandHandlers = [CreateProjectHandler, PatchProjectHandler, DeleteProjectHandler];
const queryHandlers = [GetProjectsHandler];

@Module({
	imports: [CqrsModule, TypeOrmModule.forFeature([ProjectEntity, TableEntity, ColumnEntity])],
	providers: [ProjectsService, ...commandHandlers, ...queryHandlers],
	controllers: [ProjectsController],
})
export class ProjectsModule {}
