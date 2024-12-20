import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { env } from '~/global/env';
import { EntityExistConstraint } from './constraints/entity-exist.constraint';
import { UniqueConstraint } from './constraints/unique.constraint';
import { TypeORMLogger } from './typeorm-logger';
const providers = [EntityExistConstraint, UniqueConstraint];
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (configService) => {
                    let loggerOptions = env('DB_LOGGING');
                    try {
                        // 解析成 js 数组 ['error']
                        loggerOptions = JSON.parse(loggerOptions);
                    }
                    catch {
                        // ignore
                    }
                    return {
                        ...configService.get('database'),
                        autoLoadEntities: true,
                        logging: loggerOptions,
                        logger: new TypeORMLogger(loggerOptions),
                    };
                },
                // dataSource receives the configured DataSourceOptions
                // and returns a Promise<DataSource>.
                dataSourceFactory: async (options) => {
                    const dataSource = await new DataSource(options).initialize();
                    return dataSource;
                },
            }),
        ],
        providers,
        exports: providers,
    })
], DatabaseModule);
export { DatabaseModule };
//# sourceMappingURL=database.module.js.map