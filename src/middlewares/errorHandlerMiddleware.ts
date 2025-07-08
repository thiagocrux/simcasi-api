import type { NextFunction, Request, Response } from 'express';

import { logger } from '../utils';

interface CustomError extends Error {
  statusCode?: number;
}

export function errorHandlerMiddleware(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (response.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;

  logger.error({
    message: error.message,
    name: error.name,
    stack: error.stack,
    statusCode,
  });

  response.status(statusCode).json({
    error: {
      message: error.message,
      name: error.name,
      statusCode,
    },
  });
}
