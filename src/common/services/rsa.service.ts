import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import path from 'path';

import NodeRSA from 'node-rsa';

const ROOT_PATH = path.resolve(process.cwd());
const PATH_PRIVATE_KEY = path.join(ROOT_PATH, 'src/keys/private.pem');
const _PATH_PUBLIC_KEY = path.join(ROOT_PATH, 'src/keys/public.pem');

@Injectable()
export class RsaService {
  private privateKey: NodeRSA;

  constructor() {
    try {
      const privateKeyPem: string = fs.readFileSync(PATH_PRIVATE_KEY, 'utf8');
      // const publicString: string = fs.readFileSync(PATH_PUBLIC_KEY, 'utf8');
      // const pubicKey = new NodeRSA(publicString);
      // console.log(pubicKey.encrypt('123456Amgt', 'base64'));

      this.privateKey = new NodeRSA(privateKeyPem);
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
}
