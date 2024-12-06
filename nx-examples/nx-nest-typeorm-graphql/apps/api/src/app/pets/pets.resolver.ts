import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entity/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

import { Owner } from '../owner/entities/owner.entity';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Query(() => Pet)
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.petsService.findOne(id);
  }

  @Query(() => [Pet])
  async pets(): Promise<Pet[]> {
    return await this.petsService.findAll();
  }

  // @ResolveField(() => Owner)
  // async owner(@Parent() pet: Pet) {
  //   return await this.petsService.getOwner(pet.ownerId);
  // }

  @Mutation(() => Pet)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput
  ): Promise<Pet> {
    return await this.petsService.create(createPetInput);
  }

  // @Mutation(() => Pet)
  // async updatePet(
  //   @Args('updatePetInput') updatePetInput: UpdatePetInput
  // ): Promise<Pet> {
  //   return await this.petsService.update(updatePetInput);
  // }
}
