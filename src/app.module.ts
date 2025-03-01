import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

import {
  EnvConfiguration,
  Environments,
  EnvJoiValidationSchema,
  EnvKeys,
} from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: EnvJoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(EnvKeys.DB_HOST),
        port: configService.get<number>(EnvKeys.DB_PORT),
        database: configService.get<string>(EnvKeys.DB_NAME),
        username: configService.get<string>(EnvKeys.DB_USERNAME),
        password: configService.get<string>(EnvKeys.DB_PASSWORD),
        autoLoadEntities: true,
        synchronize:
          configService.get<string>(EnvKeys.ENV) === Environments.DEV,
      }),
    }),

    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
