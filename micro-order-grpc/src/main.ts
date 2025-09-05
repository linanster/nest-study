import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:8082',
        package: 'orderService',
        protoPath: join(__dirname, 'order.proto'),
      },
    },
  );
  await app.listen();
  console.log('Order microservice is listening on gRPC port 0.0.0.0:8082');
}
bootstrap().catch((err) => console.error(err));
