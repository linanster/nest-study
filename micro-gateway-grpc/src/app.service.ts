import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface OrderServiceInterface {
  getOrder(data: { orderNumber: string }): Observable<any>;
}

@Injectable()
export class AppService implements OnModuleInit {
  private orderService: OrderServiceInterface;

  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientGrpc) {}

  onModuleInit() {
    this.orderService = this.orderClient.getService<OrderServiceInterface>('OrderService');
  }

  getOrder(): Observable<any> {
    return this.orderService.getOrder({ orderNumber: 'pos1234' });
  }
}
