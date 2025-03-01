import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvConfiguration, EnvJoiValidationSchema } from './config';

import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        host: configService.get<string>('db_host'),
        port: configService.get<number>('db_port'),
        database: configService.get<string>('db_name'),
        username: configService.get<string>('db_username'),
        password: configService.get<string>('db_password'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('db_password') === 'dev',
      }),
    }),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
