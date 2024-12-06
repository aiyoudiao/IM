import { Module } from '@nestjs/common';
import { BankersService } from './bankers.service';
import { BankersResolver } from './bankers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banker } from './entities/banker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banker])],
  providers: [BankersResolver, BankersService],
})
export class BankersModule {}
