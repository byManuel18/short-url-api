import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import path from 'path';

import NodeRSA from 'node-rsa';

const ROOT_PATH = path.resolve(process.cwd());
const PATH_PRIVATE_KEY = path.join(ROOT_PATH, 'src/keys/private.pem');
const PATH_PUBLIC_KEY = path.join(ROOT_PATH, 'src/keys/public.pem');

@Injectable()
export class RsaService {
  private privateKey: NodeRSA;
  private publicKey: NodeRSA;

  constructor() {
    try {
      const privateKeyPem: string = fs.readFileSync(PATH_PRIVATE_KEY, 'utf8');
      const publicKeyPem: string = fs.readFileSync(PATH_PUBLIC_KEY, 'utf8');

      this.privateKey = new NodeRSA(privateKeyPem);
      this.publicKey = new NodeRSA(publicKeyPem, 'public');
    } catch (_) {
      /* empty */
    }
  }

  decryptPassword(encryptedPassword: string): string {
    try {
      const decryptPassword = this.privateKey.decrypt(
        encryptedPassword,
        'utf8',
      );
      return decryptPassword;
    } catch (_) {
      return '';
    }
  }

  encryptPassword(data: string): string {
    try {
      const encryptPassword = this.publicKey.encrypt(data, 'utf8');
      return encryptPassword;
    } catch (_) {
      return '';
    }
  }

  get publicKeyString(): string {
    return this.publicKey.exportKey('public');
  }
}
