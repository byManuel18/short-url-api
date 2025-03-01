import { Module } from '@nestjs/common';
import { QRCodeService, RsaService } from './services';

@Module({
  controllers: [],
  providers: [RsaService, QRCodeService],
  exports: [RsaService, QRCodeService],
})
export class CommonModule {}
