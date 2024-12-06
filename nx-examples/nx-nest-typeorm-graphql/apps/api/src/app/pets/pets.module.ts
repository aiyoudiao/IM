import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsService } from './pets.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Pet } from './entity/pet.entity';
import { PetsResolver } from './pets.resolver';
import { OwnerModule } from '../owner/owner.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), OwnerModule],
  providers: [PetsResolver, PetsService],
  exports: [PetsService],
})
export class PetsModule {}
