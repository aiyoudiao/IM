import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BankersService } from './bankers.service';
import { Banker } from './entities/banker.entity';
import { CreateBankerInput } from './dto/create-banker.input';
import { UpdateBankerInput } from './dto/update-banker.input';

@Resolver(() => Banker)
export class BankersResolver {
  constructor(private readonly bankersService: BankersService) {}

  @Mutation(() => Banker)
  async createBanker(
    @Args('createBankerInput') createBankerInput: CreateBankerInput
  ) {
    return await this.bankersService.create(createBankerInput);
  }

  @Query(() => [Banker], { name: 'bankers' })
  findAll() {
    return this.bankersService.findAll();
  }

  @Query(() => Banker, { name: 'banker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bankersService.findOne(id);
  }

  @Mutation(() => Banker)
  updateBanker(
    @Args('updateBankerInput') updateBankerInput: UpdateBankerInput
  ) {
    return this.bankersService.update(updateBankerInput.id, updateBankerInput);
  }

  @Mutation(() => Banker)
  removeBanker(@Args('id', { type: () => Int }) id: number) {
    return this.bankersService.remove(id);
  }
}
