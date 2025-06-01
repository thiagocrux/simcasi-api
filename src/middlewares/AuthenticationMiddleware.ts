import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { ENVS, IS_AUTHENTICATION_DISABLED } from '../config';
import { SessionsRepository } from '../repositories';
import { Data, Middleware, Request, Response } from '../types';

import {
  InvalidAccessTokenError,
  MissingAccessTokenError,
  UnauthorizedError,
} from '../utils';

export class AuthenticationMiddleware implements Middleware {
  constructor() {}

  async handle(request: Request): Promise<Response | Data> {
    if (IS_AUTHENTICATION_DISABLED) {
      return { data: {} };
    }

    const { authorization } = request.headers;

    if (!authorization) {
      throw new MissingAccessTokenError();
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new InvalidAccessTokenError();
    }

    const {
      sub: accountId,
      rid: roleId,
      sid: sessionId,
    } = jwt.verify(token, ENVS.jwtSecret) as JwtPayload;

    if (!accountId) {
      throw new InvalidAccessTokenError();
    }

    const accountRelatedSession = await SessionsRepository.find({
      _id: sessionId,
      accountId: new Types.ObjectId(accountId),
    });

    if (!accountRelatedSession || !accountRelatedSession?.isActive) {
      throw new UnauthorizedError();
    }

    return {
      data: {
        id: accountId,
        role: roleId,
      },
    };
  }
}
