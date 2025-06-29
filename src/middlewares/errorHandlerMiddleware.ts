import type { NextFunction, Request, Response } from 'express';

import { logger } from '../utils';

interface CustomError extends Error {
  statusCode: number;
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

  logger.error({ ...error });
  response.status(error.statusCode).json({ error });
}
