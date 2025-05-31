import { RolesRepository } from '../repositories';
import { Data, Middleware, Request, Response } from '../types';
import { MissingDataError, UnauthorizedError } from '../utils';

export class AuthorizationMiddleware implements Middleware {
  constructor(private readonly requiredPermissions: string[]) {}

  async handle(request: Request): Promise<Response | Data> {
    const roleId = request.account?.role;

    if (!roleId) {
      throw new MissingDataError('role id');
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
