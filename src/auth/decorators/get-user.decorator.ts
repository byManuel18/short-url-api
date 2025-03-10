import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const Getuser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  if (!user) {
    throw new InternalServerErrorException('User not found (request)');
  }

  if (data) {
    return user[data];
  }

  return !data ? user : user;
});
