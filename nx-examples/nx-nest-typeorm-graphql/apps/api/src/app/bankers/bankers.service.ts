import { Injectable } from '@nestjs/common';
import { CreateBankerInput } from './dto/create-banker.input';
import { UpdateBankerInput } from './dto/update-banker.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banker } from './entities/banker.entity';

@Injectable()
export class BankersService {
  constructor(
    @InjectRepository(Banker)
    private readonly bankersRepository: Repository<Banker>
  ) {}

  async create(createBankerInput: CreateBankerInput) {
    const banker = this.bankersRepository.create(createBankerInput);
    return await this.bankersRepository.save(banker);
  }

  findAll() {
    return `This action returns all bankers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banker`;
  }

  update(id: number, updateBankerInput: UpdateBankerInput) {
    return `This action updates a #${id} banker`;
  }

  remove(id: number) {
    return `This action removes a #${id} banker`;
  }
}
