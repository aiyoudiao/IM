/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.enableCors({
		origin: 'http://localhost:4200',
		methods: 'GET,POST,PATCH,PUT,DELETE',
		allowedHeaders: 'Content-Type,Authorization',
		credentials: true,
	});

	const config = new DocumentBuilder()
		.setTitle('Finz API Documentation')
		.setVersion('1.0')
		.addServer('http://localhost:3000')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	const port = process.env.PORT || 3000;
	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
