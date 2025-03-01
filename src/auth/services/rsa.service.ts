import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import path from 'path';

import NodeRSA from 'node-rsa';

const PATH_PRIVATE_KEY = path.join(__dirname, '..', 'keys/private.pem');

@Injectable()
export class RsaService {
  private privateKey: NodeRSA;

  constructor() {
    const privateKeyPem: string = fs.readFileSync(PATH_PRIVATE_KEY, 'utf8');
    this.privateKey = new NodeRSA(privateKeyPem);
  }

  decryptPassword(encryptedPassword: string): string {
    try {
      return this.privateKey.decrypt(encryptedPassword, 'utf8');
    } catch (_) {
      return '';
    }
  }
}
