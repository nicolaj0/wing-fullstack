import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrackingService } from './trackingService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TrackingService],
})
export class AppModule {}
