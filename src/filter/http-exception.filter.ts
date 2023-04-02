// 🐱 Nestjs imports
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// 📦 Package imports
import { Response } from 'express';

// 🌏 Project imports
import { ResponseEntity } from '@lib/response/response-entity';
import { ResponseStatus } from '@lib/response/response-status';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { error: any; statusCode: number; message: any }
      | { error: string; statusCode: 400; message: string[] }; // class-validator 타이핑

    if (status === 500) {
      return response.status(status).json({
        statusCode: ResponseEntity.ERROR().statusCode,
        message: ResponseEntity.ERROR().message,
        data: ResponseEntity.ERROR().data,
      });
    }

    if (err.statusCode === 400) {
      // class-validator 에러
      return response.status(status).json({
        statusCode: ResponseEntity.ERROR_WITH_DATA(
          err.error,
          ResponseStatus.BAD_PARAMETER,
          err.message,
        ).statusCode,
        message: ResponseEntity.ERROR_WITH_DATA(
          err.error,
          ResponseStatus.BAD_PARAMETER,
          err.message,
        ).message,
        data: ResponseEntity.ERROR_WITH_DATA(
          err.error,
          ResponseStatus.BAD_PARAMETER,
          err.message,
        ).data,
      });
    }

    response.status(status).json({
      statusCode: ResponseEntity.ERROR_WITH(
        err.message,
        ResponseStatus.BAD_PARAMETER,
      ).statusCode,
      message: ResponseEntity.ERROR_WITH(
        err.message,
        ResponseStatus.BAD_PARAMETER,
      ).message,
      data: ResponseEntity.ERROR_WITH(err.message, ResponseStatus.BAD_PARAMETER)
        .data,
    });
  }
}
