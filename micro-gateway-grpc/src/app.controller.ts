import { Controller, Get } from '@nestjs/common';
// ...existing code...
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): string {
    return 'OK';
  }
  @Get('getOrder')
  getOrder(): object {
    return this.appService.getOrder();
  }
  @Get('submitOrder')
  submitOrder(): object {
    return this.appService.submitOrder();
  }
}
