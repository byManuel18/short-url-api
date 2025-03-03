import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';

import { DecryptPasswordPipe } from './pipes/decryptPasswordPipe.pipe';

import { COOKIE_ACCESS } from './strategies/jwt.strategy';
import { CreateUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @UsePipes(
    DecryptPasswordPipe,
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )
  async create(
    @Body() createUserDto: CreateUserDTO,
    @Res() response: Response,
  ) {
    const { token, ...newUser } = await this.authService.create(createUserDto);
    response.cookie(COOKIE_ACCESS, token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    response.send(newUser);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.authService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
