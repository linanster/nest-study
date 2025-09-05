import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface OrderService {
  getOrder(data: { orderNumber: string }): Observable<any>;
}

@Injectable()
export class AppService implements OnModuleInit {
  private orderService: OrderService;

  constructor(@Inject('ORDER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService = this.client.getService<OrderService>('OrderService');
  }

  getOrder(): Observable<any> {
    return this.orderService.getOrder({ orderNumber: 'pos1234' });
  }
}
