import { IS_AUTHORIZATION_DISABLED } from '../config';
import { RolesRepository } from '../repositories';
import { Data, Middleware, PermissionCodes, Request, Response } from '../types';
import { MissingDataError, UnauthorizedError } from '../utils';

export class AuthorizationMiddleware implements Middleware {
  constructor(
    private readonly requiredPermission: string,
    private readonly rolesRepository: RolesRepository
  ) {}

  async handle(request: Request): Promise<Response | Data> {
    if (IS_AUTHORIZATION_DISABLED) {
      return { data: {} };
    }

    const roleId = request.account?.role;

    if (!roleId) {
      throw new MissingDataError('role id');
    }

    const role = await this.rolesRepository.find({
      _id: String(roleId),
    });

    if (!role) {
      throw new UnauthorizedError();
    }

    const isAccountAuthorized = role.permissions.includes(
      this.requiredPermission as PermissionCodes
    );

    if (!isAccountAuthorized) {
      throw new UnauthorizedError();
    }

    return { data: {} };
  }
}
