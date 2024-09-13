import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all.exceptions.filter';

async function bootstrap() {
  // App config
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  // Launching the application
  await app.listen(process.env.PORT);

  const appUrl = await app.getUrl();
  Logger.verbose(`🚀 Application is on: ${appUrl}`);
  Logger.verbose(`🛸 Swagger is on: ${appUrl}/api`);
}
bootstrap();
