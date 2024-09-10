import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000000)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/redirect')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000000)
  getReturn() {
    return 'essa página já pode ser fechada';
  }
}
