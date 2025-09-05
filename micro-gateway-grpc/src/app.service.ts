import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface UniversalRequest {
  action: string;
  payload: string;
  metadata?: { [key: string]: string };
}

interface UniversalResponse {
  status: number;
  data: string;
  error: string;
}

interface OrderServiceInterface {
  execute(request: UniversalRequest): Observable<UniversalResponse>;
}

@Injectable()
export class AppService implements OnModuleInit {
  private orderService: OrderServiceInterface;

  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientGrpc) {}

  onModuleInit() {
    this.orderService =
      this.orderClient.getService<OrderServiceInterface>('OrderService');
  }

  getOrder(): Observable<unknown> {
    const request: UniversalRequest = {
      action: 'GetOrder',
      payload: JSON.stringify({ orderNumber: 'pos1234' }),
    };

    return this.orderService.execute(request).pipe(
      map((response) => {
        if (response.status !== 0) {
          throw new Error(response.error || 'Unknown error');
        }
        return JSON.parse(response.data) as unknown;
      }),
    );
  }

  submitOrder(): Observable<unknown> {
    const request: UniversalRequest = {
      action: 'SubmitOrder',
      payload: JSON.stringify({ ean: 'roger_pro', quatity: 2 }),
    };

    return this.orderService.execute(request).pipe(
      map((response) => {
        if (response.status !== 0) {
          throw new Error(response.error || 'Unknown error');
        }
        return JSON.parse(response.data) as unknown;
      }),
    );
  }
}
