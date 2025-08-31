import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  getOrder(): Observable<any> {
    return this.client.send('get_order', {});
  }
}
