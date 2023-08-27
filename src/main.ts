import { NestFactory } from '@nestjs/core';

import { setNestApp } from '@lib/common/set-nest-app';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  await app.listen(3000);
}

bootstrap();
