import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QRCodeService {
  async generateQRCode(text: string): Promise<string> {
    try {
      const qrCode = await QRCode.toDataURL(text);
      return qrCode;
    } catch (_) {
      throw new Error('Error al generar el código QR');
    }
  }
}
