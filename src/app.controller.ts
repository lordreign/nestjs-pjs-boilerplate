import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('get hello');
    this.logger.debug('test debug');
    this.logger.error('test error');

    return this.appService.getHello();
  }
}
