import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { COOKIE_ACCESS } from 'src/auth/strategies/jwt.strategy';
import { Environments, EnvKeys } from 'src/config';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      tap((data) => {
        if (data?.token) {
          const duration =
            this.configService.get<string>(EnvKeys.JWT_EXPIRES) || '24h';
          const maxAge = this.parseDuration(duration);

          response.cookie(COOKIE_ACCESS, data.token, {
            httpOnly: true,
            secure:
              this.configService.get<string>(EnvKeys.ENV) === Environments.PROD,
            sameSite: 'strict',
            maxAge,
          });

          delete data.token;
        }
      }),
    );
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match)
      throw new InternalServerErrorException('Invalid Time Duration Cookie');

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1000,
      m: 1000 * 60,
      h: 1000 * 60 * 60,
      d: 1000 * 60 * 60 * 24,
    };

    return value * multipliers[unit];
  }
}
