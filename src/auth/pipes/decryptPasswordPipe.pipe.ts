import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDTO } from '../dto';
import { RsaService } from 'src/common/services';

@Injectable()
export class DecryptPasswordPipe implements PipeTransform<CreateUserDTO> {
  constructor(private readonly rsaService: RsaService) {}

  transform(value: CreateUserDTO): CreateUserDTO {
    if (!value.password) {
      throw new BadRequestException('Password is required');
    }

    try {
      const decryptedPassword = this.rsaService.decryptPassword(value.password);
      if (!decryptedPassword) {
        throw new BadRequestException('Invalid encrypted password');
      }
      return { ...value, password: decryptedPassword };
    } catch (_) {
      throw new BadRequestException('Invalid encrypted password');
    }
  }
}
