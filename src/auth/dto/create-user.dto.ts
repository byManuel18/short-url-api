import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REG_EXP } from '../constants/password.constants';

export class CreateUserDTO {
  @IsString()
  @MinLength(6)
  userName: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(PASSWORD_REG_EXP, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
