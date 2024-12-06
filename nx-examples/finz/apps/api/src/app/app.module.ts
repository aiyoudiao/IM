import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';

@Module({
	imports: [
		ProjectsModule,
		TypeOrmModule.forRootAsync({
			imports: [],
			inject: [],
			useFactory: () => ({
				type: 'postgres',
				host: 'localhost',
				port: 5432,
				username: 'postgres',
				password: 'password',
				database: 'finz',
				schema: 'public',
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
