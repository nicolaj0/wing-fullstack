import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as fs from 'fs';
import { ExternalApiService } from './externalApiService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ExternalApiService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should calculate revenue from real data', async () => {
      const actual = await appController.generate();

      //revenue should be 5255
      expect(actual.revenue).toBe(5255);

      //check tracking ids are >0 and < 110000000
      expect(actual.parcels[0].tracking_id).toBeGreaterThan(0);
    });
  });
});
