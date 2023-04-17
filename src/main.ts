import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { customLogger } from './helper/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  customLogger();
  customLogger('ADS SENDER API');
  customLogger(`PORT: ${process.env.PORT}`);
  customLogger();

  await app.listen(`${process.env.PORT}`);

  customLogger();
  customLogger('LOGS');
  customLogger();
}
bootstrap();
