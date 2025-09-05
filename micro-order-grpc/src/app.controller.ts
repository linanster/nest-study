import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('OrderService', 'GetOrder')
  getOrder(data: { orderNumber: string }) {
    return this.appService.getOrder(data.orderNumber);
  }
}
