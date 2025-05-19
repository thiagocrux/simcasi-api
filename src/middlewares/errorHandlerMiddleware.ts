import type { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(500).json({ error });
}
