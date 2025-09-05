import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 8082,
      },
    },
  );
  await app.listen();
  console.log('Order microservice is listening on TCP port 0.0.0.0:8082');
}
bootstrap().catch((err) => console.error(err));
