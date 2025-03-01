import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services';

import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CommonModule],
})
export class AuthModule {}
