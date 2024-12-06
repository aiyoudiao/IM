import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBankerInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  card_number: string;

  @Field()
  employee_number: string;
}
