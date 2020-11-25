import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); //* useContainer to inject service in Validator Class
  app.useGlobalPipes(new ValidationPipe()); //* Use global pipe to validate DTOs
  await app.listen(3000);
}
bootstrap();
