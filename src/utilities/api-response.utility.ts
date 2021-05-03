import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import { Error } from 'mongoose';

export interface ICookie {
  key: string;
  value: string;
}

interface IError {
  key?: string;
  message?: string;
}

export default class ApiResponse {
  static result = (
    res: Response,
    data: object,
    status: number = 200,
  ) => {
    res.status(status);
    res.json(data);
  };

  static resultWithCookie = (
    res: Response,
    data: object,
    status: number = 200,
    cookie: ICookie = null,
  ) => {
    res.status(status);
    if (cookie) {
      res.cookie(cookie.key, cookie.value);
    }
    res.json({
      data,
      success: true,
    });
  };

  static error = (
    res: Response,
    status: number = 400,
    error: any = httpStatusCodes.getStatusText(status),
  ) => {
    if (error instanceof Error.ValidationError) {
      if (ApiResponse.handleValidationError(error)) {
        return res.status(status).json({
          error: ApiResponse.handleValidationError(error),
        });
      }
    }

    if (error.code === 11000 || error.code === '11000') {
      return res.status(status).json({
        error: 'Duplicate found.',
      });
    }

    return res.status(status).json({
      error,
    });
  };

  static setCookie = (res: Response, key: string, value: string) => {
    res.cookie(key, value);
  };

  private static handleValidationError(error: Error.ValidationError): any {
    const arrError: IError[] = [];

    if (Object.keys(error).length) {
      for (const key in error) {
        if (key === 'errors') {
          if (Object.keys(error[key]).length) {
            for (const k in error[key]) {
              const obj: IError = {
                key: k,
                message: error[key][k].message,
              }
              arrError.push(obj);
            }
          }
        }
      }
    }

    if (arrError.length) {
      return arrError[0].message;
    }

    return null;
  }
}
