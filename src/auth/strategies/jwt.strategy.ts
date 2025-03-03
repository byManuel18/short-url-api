import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';

import { EnvKeys } from 'src/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export const COOKIE_ACCESS = 'access_token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>(EnvKeys.JWT_SECRET, ''),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.[COOKIE_ACCESS];
        },
      ]),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    return user;
  }
}
