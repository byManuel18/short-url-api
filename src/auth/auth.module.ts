import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService, RsaService } from './services';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RsaService],
})
export class AuthModule {}
