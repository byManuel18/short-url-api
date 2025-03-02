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
} from '@nestjs/common';
import { AuthService } from './services/auth.service';

import { DecryptPasswordPipe } from './pipes/decryptPasswordPipe.pipe';

import { CreateUserDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @UsePipes(
    DecryptPasswordPipe,
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )
  create(@Body() createUserDto: CreateUserDTO) {
    return this.authService.create(createUserDto);
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
