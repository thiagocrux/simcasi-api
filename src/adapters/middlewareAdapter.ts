import { NextFunction, Request, Response } from 'express';

import { Middleware } from '../types';

export function middlewareAdapter(middleware: Middleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      body: request.body,
      params: request.params,
      headers: request.headers as Record<string, string>,
      // account: request.metadata?.account,
    });

    if ('statusCode' in result) {
      response.status(result.statusCode).json(result.body);
      return;
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };

    next();
  };
}
