import express from 'express';
import * as HttpStatus from 'http-status-codes';

interface IJoiErrorDetail {
  message?: string;
  path?: string[];
  type?: string;
  context?: object;
}

interface IJoiError {
  error: {
    isJoi?: boolean;
    name?: string;
    details?: IJoiErrorDetail[],
  };
  value?: any;
  type?: any;
}

export default (
  err: IJoiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err.error && err.error.isJoi) {
    if (err.error.details && err.error.details.length) {
      for (const item of err.error.details) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error: item.message,
        });
      }
    }
  }
  return next(err);
};
