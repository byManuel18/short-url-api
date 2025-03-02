import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';

import { CommonModule } from 'src/common/common.module';

import { AuthService } from './services';

import { DecryptPasswordPipe } from './pipes/decryptPasswordPipe.pipe';

import { User } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DecryptPasswordPipe],
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  exports: [TypeOrmModule, AuthService],
})
export class AuthModule {}
