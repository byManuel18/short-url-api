import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';

import { CreateUserDTO } from '../dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepositiry: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    try {
      const user = this.userRepositiry.create({
        ...createUserDto,
      });
      await this.userRepositiry.save(user);

      const { password, ...restUser } = user;

      return {
        ...restUser,
        token: this.getJwtToken({ id: restUser.id }),
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

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
