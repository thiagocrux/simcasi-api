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

  const formattedMessage = ['ZodError'].includes(error.name)
    ? JSON.parse(error.message)
    : error.message;

  logger.error({
    message: formattedMessage,
    name: error.name,
    statusCode,
    stack: error.stack ? error.stack.split('\n') : undefined,
  });

  response.status(statusCode).json({
    error: {
      message: formattedMessage,
      name: error.name,
      statusCode,
    },
  });
}
