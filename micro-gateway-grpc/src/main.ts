import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001, '0.0.0.0');
  console.log('Gateway is running on http://0.0.0.0:3001');
}
bootstrap().catch((err) => console.error(err));
