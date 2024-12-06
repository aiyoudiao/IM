import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private readonly ownerRepository: Repository<Owner>
  ) {}

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerInput);
    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepository.find({ relations: ['pets'] });
  }

  async findOne(id: string): Promise<Owner> {
    return await this.ownerRepository.findOneOrFail({ where: { id } });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
