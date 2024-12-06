import { CreateBankerInput } from './create-banker.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBankerInput extends PartialType(CreateBankerInput) {
  @Field(() => Int)
  id: number;
}
