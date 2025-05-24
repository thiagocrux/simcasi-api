import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ENVS } from '../config';
import { InvalidAccessTokenError, MissingAccessTokenError } from '../utils';

export function authenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new MissingAccessTokenError();
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw new InvalidAccessTokenError();
  }

  jwt.verify(token, ENVS.jwtSecret) as JwtPayload;
  next();
}
