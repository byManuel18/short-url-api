import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';

import { CommonModule } from 'src/common/common.module';

import { AuthService } from './services';

import { JwtStrategy } from './strategies/jwt.strategy';

import { DecryptPasswordPipe } from './pipes/decryptPasswordPipe.pipe';

import { User } from './entities/user.entity';
import { EnvKeys } from 'src/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DecryptPasswordPipe],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>(EnvKeys.JWT_SECRET),
          signOptions: {
            expiresIn: configService.get<string>(EnvKeys.JWT_EXPIRES),
          },
        };
      },
    }),
    CommonModule,
  ],
  exports: [TypeOrmModule, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
