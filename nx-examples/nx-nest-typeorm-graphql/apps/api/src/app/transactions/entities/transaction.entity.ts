import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
});

@Entity()
@ObjectType()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ type: 'enum', enum: TransactionType })
  @Field(() => TransactionType)
  type: TransactionType;

  @Column({ type: 'numeric' })
  @Field(() => Int)
  amount: number;

  @ManyToOne(() => Client, (client) => client.transactions)
  @JoinColumn({ name: 'client_id' })
  @Field(() => Client)
  client: Client;

  @CreateDateColumn()
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated_at: Date;
}
