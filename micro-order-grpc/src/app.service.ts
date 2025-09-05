import * as os from 'os';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOrder(orderNumber: string) {
    return {
      orderNumber: orderNumber,
      price: 100,
      hostName: os.hostname(),
    };
  },
  submitOrder(ean: string, quatity: number) {
    return {
      orderNumber: 'we123',
      ean: 'abcdef',
      quatity: 2,
      hostName: os.hostname(),
    };
  }
}
