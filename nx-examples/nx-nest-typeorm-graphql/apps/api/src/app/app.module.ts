import { PetsModule } from './pets/pets.module';
import { Module } from '@nestjs/common';

import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import {
  ConfigurationModule,
  ConfigurationService,
} from '@nx-nest-typeorm-graphql/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerModule } from './owner/owner.module';
import { ClientsModule } from './clients/clients.module';
import { BankersModule } from './bankers/bankers.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    PetsModule,
    ConfigurationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'postgres',
        url: configurationService.POSTGRES_DB_URL,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigurationService],
    }),
    OwnerModule,
    ClientsModule,
    BankersModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
