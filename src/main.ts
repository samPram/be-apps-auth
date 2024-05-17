import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get Config
  const config: ConfigService = app.get(ConfigService);

  // Set Up Port Service
  await app.listen(config.get('app.port') || 4000);
}
bootstrap();
