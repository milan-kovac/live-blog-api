import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all.exceptions.filter';
import { RedisIoAdapter } from './shared/adapters/redis.io.adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // App config
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  // Swagger config
  const config = new DocumentBuilder().setTitle('Constellation').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Launching the application
  await app.listen(process.env.PORT);

  const appUrl = await app.getUrl();
  Logger.verbose(`🚀 Application is on: ${appUrl}`);
  Logger.verbose(`🛸 Swagger is on: ${appUrl}/api`);
}
bootstrap();
