import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOrder(): { order: string } {
    return { order: 'num123' };
  }
}
