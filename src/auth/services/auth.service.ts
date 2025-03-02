import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

import { CreateUserDTO } from '../dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepositiry: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    try {
      const user = this.userRepositiry.create({
        ...createUserDto,
      });
      await this.userRepositiry.save(user);

      const { password, ...restUser } = user;

      return {
        restUser,
      };
    } catch (error) {
      throw new Error(error.detail as string);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
