import HttpStatus from 'http-status-codes';
import express from 'express';

export interface IError {
  status?: number;
  code?: number;
  message?: string;
}

export const notFoundErrorHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
  });
}

export const errorHandler = (
  err: IError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: err.message || HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  });
}
