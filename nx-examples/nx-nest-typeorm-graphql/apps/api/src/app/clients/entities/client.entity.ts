import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Person } from '@nx-nest-typeorm-graphql/common';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Banker } from '../../bankers/entities/banker.entity';

@Entity()
@ObjectType()
export class Client extends Person {
  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  balance: number;

  @Column({ name: 'active', default: true })
  @Field(() => Boolean)
  is_active: boolean;

  @Column({ type: 'simple-json', nullable: true })
  @Field(() => AdditionalInfo, { nullable: true })
  additional_info?: {
    age: number;
    address: string;
    phone: string;
  };

  @Column({ type: 'simple-array', default: [] })
  @Field(() => [String])
  family_members: string[];

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  @Field(() => [Transaction])
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  @Field(() => [Banker])
  bankers: Banker[];
}

@ObjectType()
export class AdditionalInfo {
  @Field(() => Int)
  age: number;

  @Field()
  address: string;

  @Field()
  phone: string;
}
