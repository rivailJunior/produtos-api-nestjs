import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { NestResponse } from 'src/core/http/nest-response';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerResponse: NestResponse) => {
        if (controllerResponse instanceof NestResponse) {
          const contexto = context.switchToHttp();
          const response = contexto.getResponse();
          const { headers, status, body } = controllerResponse;

          const headersNames = Object.getOwnPropertyNames(headers);
          headersNames.forEach((item) => {
            const headerValue = headers[item];
            this.httpAdapter.setHeader(response, item, headerValue);
          });
          this.httpAdapter.status(response, status);
          return body;
        }
        return controllerResponse;
      }),
    );
  }
}
