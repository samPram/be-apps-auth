import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { PostgresConfigModule } from './config/database/config.module';
import { PostgresProviderModule } from './providers/database/provider.module';

@Module({
  imports: [AppConfigModule, PostgresConfigModule, PostgresProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
