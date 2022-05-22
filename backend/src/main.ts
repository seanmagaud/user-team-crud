if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  ); // https://docs.nestjs.com/techniques/validation#transform-payload-objects
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
