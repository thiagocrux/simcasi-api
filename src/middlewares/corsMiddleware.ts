import type { NextFunction, Request, Response } from 'express';

export function corsMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  const origin = request.header('Origin');

  const isOriginAllowed =
    origin !== undefined && allowedOrigins.includes(origin);

  if (isOriginAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }

  next();
}
