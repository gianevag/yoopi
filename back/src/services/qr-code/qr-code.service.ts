import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';

const DEFAULT_QROPTIONS: qrcode.QRCodeToDataURLOptions = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 0.9,
  width: 300,
  margin: 1,
  color: {
    dark: '#000000',
    light: '#ffffff',
  },
};

@Injectable()
export class QrCodeService {
  generateQrCodeImage(data: string, options = DEFAULT_QROPTIONS): void {
    const pathname = `./src/assets/qrCodes/${data}.png`;
    return qrcode.toFile(pathname, data, options);
  }
}