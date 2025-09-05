import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

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

interface GetOrderParams {
  orderNumber: string;
}

interface SubmitOrderParams {
  ean: string;
  quatity: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('OrderService', 'Execute')
  execute(request: UniversalRequest): UniversalResponse {
    try {
      const { action, payload } = request;
      let params: unknown;

      try {
        params = JSON.parse(payload || '{}');
      } catch {
        throw new Error('Invalid JSON payload');
      }

      let result: unknown;

      switch (action) {
        case 'GetOrder': {
          const getOrderParams = params as GetOrderParams;
          if (!getOrderParams.orderNumber) {
            throw new Error('orderNumber is required');
          }
          result = this.appService.getOrder(getOrderParams.orderNumber);
          break;
        }

        case 'SubmitOrder': {
          const submitOrderParams = params as SubmitOrderParams;
          if (!submitOrderParams.ean || !submitOrderParams.quatity) {
            throw new Error('ean and quatity are required');
          }
          result = this.appService.submitOrder(
            submitOrderParams.ean,
            submitOrderParams.quatity,
          );
          break;
        }

        default:
          throw new Error(`Unknown action: ${action}`);
      }

      return {
        status: 0,
        data: JSON.stringify(result),
        error: '',
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      return {
        status: 1,
        data: '',
        error: errorMessage,
      };
    }
  }
}
