// 🐱 Nestjs imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// 🌏 Project imports
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
