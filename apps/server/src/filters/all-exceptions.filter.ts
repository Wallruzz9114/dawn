import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import express from 'express';
import { isString } from 'lodash';
import mongoose from 'mongoose';
import { infoLogger } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public catch = (exception: unknown, host: ArgumentsHost) => {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as express.Response;

    if (exception instanceof mongoose.Error.ValidationError) {
      infoLogger.warn(exception.message);

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
      });
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as HttpException;

      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        infoLogger.error('Intenal server request error.', exception);
      }

      return response.status(status).json({
        statusCode: status,
        message: isString(exceptionResponse)
          ? exceptionResponse
          : exceptionResponse.message,
      });
    }

    infoLogger.error('Unknown error.', exception);

    return response.status(status).json({
      statusCode: status,
      message: 'Server error, please try again later',
    });
  };
}
