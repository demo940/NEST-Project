import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class StandardResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const res: Response = ctx.getResponse<Response>();
        const statusCode = res.statusCode;

        return {
          success: true,
          statusCode,
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
