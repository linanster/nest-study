import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: `${process.env.MICROSERVICE_ORDER_HOST || 'localhost'}:${process.env.MICROSERVICE_ORDER_PORT || 8082}`,
          package: 'orderService',
          protoPath: join(__dirname, 'order.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
