import type { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode: number;
}

export function errorHandlerMiddleware(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(error.statusCode || 500).json({ error });
}
