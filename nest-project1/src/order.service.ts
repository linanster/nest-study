import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  // 语法1
  // async getOrder(): Promise<{ order: string }> {
  //   // 延迟1秒
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   return { order: '100' };
  // }
  // 语法2
  async getOrder(): Promise<{ order: string }> {
    // 延迟1秒
    return await new Promise((resolve) => {
      setTimeout(() => resolve({ order: '123' }), 5000);
    });
  }
  // 语法3:更易懂的sleep函数
  // private sleep(ms: number): Promise<void> {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // async getOrder(): Promise<{ order: string }> {
  //   // 延迟1秒
  //   await this.sleep(1000);
  //   return { order: '100' };
  // }
}
