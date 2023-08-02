import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TrackingService {
  async getTrackingId(useApi: boolean): Promise<number> {
    if (!useApi) {
      const min = 100000000;
      const max = 110000000;
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return Promise.resolve(num);
    }

    const url =
      'https://www.random.org/integers/?num=1&min=100000000&max=110000000&col=1&base=10&format=plain&rnd=new';

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error getting tracking id');
    }
  }
}
