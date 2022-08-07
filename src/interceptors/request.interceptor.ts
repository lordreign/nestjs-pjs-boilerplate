import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    Logger.debug(
      '======================= Request Header =======================',
    );
    Logger.debug(`\n${JSON.stringify(request.headers, null, 2)}\n`);
    if (Object.keys(request.body).length > 0) {
      Logger.debug(
        '======================= Request Body =======================',
      );
      Logger.debug(`\n${JSON.stringify(request.body, null, 2)}\n`);
    }

    if (Object.keys(request.param).length > 0) {
      Logger.debug(
        '======================= Request Param =======================',
      );
      Logger.debug(`\n${JSON.stringify(request.param, null, 2)}\n`);
    }

    if (Object.keys(request.query).length > 0) {
      Logger.debug(
        '======================= Request Query =======================',
      );
      Logger.debug(`\n${JSON.stringify(request.query, null, 2)}\n`);
    }
    return next.handle();
  }
}
