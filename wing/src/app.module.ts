import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExternalApiService } from './externalApiService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ExternalApiService],
})
export class AppModule {}
