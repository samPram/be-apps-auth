import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresConfigModule } from './config/database/config.module';
import { PostgresProviderModule } from './providers/database/provider.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresConfigModule,
    PostgresProviderModule,
    AuthModule,
  ],
})
export class AppModule {}
