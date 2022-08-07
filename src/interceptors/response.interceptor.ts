import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from 'src/common/interfaces/response.interface';
import { PageSupport } from 'src/common/supports/page.support';

interface ClassConstructor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

export function ResponseSerialize(dto: ClassConstructor) {
  return UseInterceptors(new ResponseInterceptor(dto));
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // 요청이 들어오기전
    // console.log('running before the handler', context);

    return next.handle().pipe(
      map((result: IResponse) => {
        // response가 보내지기전
        Logger.debug(
          '======================= Response Data =======================',
        );
        Logger.debug(`\n${JSON.stringify(result, null, 2)}\n`);
        // status가 존재하지 않는다면..
        if (result && !result.status) {
          result.status = context.switchToHttp().getResponse()
            .statusCode as number;
        }

        if (result.data) {
          if (result.data instanceof PageSupport) {
            if (result.data.list && result.data.list) {
              result.data.list = plainToInstance(this.dto, result.data.list, {
                excludeExtraneousValues: true, // expose만 노출 시킴
              });
            }
          } else {
            result.data = plainToInstance(this.dto, result.data, {
              excludeExtraneousValues: true, // expose만 노출 시킴
            });
          }
        }
        return result;
      }),
    );
  }
}
