import { Controller, Get } from '@nestjs/common';
// ...existing code...
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('order')
  getOrder(): object {
    return this.appService.getOrder();
  }
}
