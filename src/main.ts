import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { Environments, EnvKeys } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const env = configService.get<string>(EnvKeys.ENV);
  if (env === Environments.DEV) {
    const config = new DocumentBuilder()
      .setTitle('API Docs')
      .setDescription('Documentación de la API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
  await app.listen(configService.get<number>(EnvKeys.PORT) ?? 3000);
}
void bootstrap();
