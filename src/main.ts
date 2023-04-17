import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { customLogger } from './helper/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  customLogger();
  customLogger('ADS SENDER API');
  customLogger(`PORT: `);
  customLogger();

  await app.listen(3000);

  customLogger();
  customLogger('LOGS');
  customLogger();
}
bootstrap();
