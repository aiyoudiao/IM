import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from '@nx-nest-typeorm-graphql/common';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity()
@ObjectType()
export class Banker extends Person {
  @Column({ unique: true, length: 10 })
  @Field()
  employee_number: string;

  @ManyToMany(() => Client)
  @JoinTable({
    name: 'bankers_clients',
    joinColumn: {
      name: 'banker',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'client',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Client])
  clients: Client[];
}
