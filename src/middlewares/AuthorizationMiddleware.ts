import jwt, { JwtPayload } from 'jsonwebtoken';

import { ENVS } from '../config';
import { RolesRepository } from '../repositories';
import { Data, Middleware, Request, Response } from '../types';
import {
  InvalidAccessTokenError,
  MissingAccessTokenError,
  NotFoundError,
  UnauthorizedError,
} from '../utils';

export class AuthorizationMiddleware implements Middleware {
  constructor(private readonly requiredPermissions: string[]) {}

  async handle(request: Request): Promise<Response | Data> {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new MissingAccessTokenError();
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new InvalidAccessTokenError();
    }

    const { rid: roleId } = jwt.verify(token, ENVS.jwtSecret) as JwtPayload;

    const role = await RolesRepository.find({ _id: roleId });

    if (!role) {
      throw new NotFoundError('role');
    }

    const permissionCodes = await RolesRepository.getRolePermissions(roleId);

    const isAccountAllowed = this.requiredPermissions.some((permissionCode) => {
      return permissionCodes?.includes(permissionCode);
    });

    if (!isAccountAllowed) {
      throw new UnauthorizedError();
    }

    return { data: {} };
  }
}
