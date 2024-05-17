import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Be Apps Logistic')
    .setDescription('REST API Documentation for Auth Services')
    .setVersion('1.0')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Get Config
  const config_service: ConfigService = app.get(ConfigService);

  // Set Up Port Service
  await app.listen(config_service.get('app.port') || 4000);
}
bootstrap();
