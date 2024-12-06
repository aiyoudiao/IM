import { OwnerService } from './../owner/owner.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entity/pet.entity';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from '../owner/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    private readonly ownerService: OwnerService
  ) {}

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find({ relations: ['owner'] });
  }

  async findOne(id: string): Promise<Pet> {
    return await this.petsRepository.findOneOrFail({ where: { id } });
  }

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const pet = this.petsRepository.create(createPetInput);
    return await this.petsRepository.save(pet);
  }

  async getOwner(ownerId: string): Promise<Owner> {
    return await this.ownerService.findOne(ownerId);
  }
  // async update(updatePetInput: UpdatePetInput)  {
  //   const pet = this.petsRepository.update(
  //     { id: updatePetInput.id },
  //     updatePetInput
  //   );
  //   return await this.petsRepository.save(pet);
  // }
}
