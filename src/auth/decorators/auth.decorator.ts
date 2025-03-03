import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleProtected } from './role-protected/role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

import { Roles } from '../enums/role.enum';

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
