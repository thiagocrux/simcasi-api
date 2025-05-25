import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ENVS } from '../config';
import { SessionsRepository } from '../repositories';

import {
  InvalidAccessTokenError,
  MissingAccessTokenError,
  UnauthorizedError,
} from '../utils';

export async function authenticationMiddleware(
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

  const { sub: accountId, sid: sessionId } = jwt.verify(
    token,
    ENVS.jwtSecret
  ) as JwtPayload;

  if (!accountId) {
    throw new InvalidAccessTokenError();
  }

  const accountRelatedSession = await SessionsRepository.find({
    _id: sessionId,
    accountId,
  });

  if (!accountRelatedSession || !accountRelatedSession?.isActive) {
    throw new UnauthorizedError();
  }

  next();
}
