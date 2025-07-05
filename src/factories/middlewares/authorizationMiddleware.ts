import { middlewareAdapter } from '../../adapters';
import { AuthorizationMiddleware } from '../../middlewares';
import { RolesRepository } from '../../repositories';

export function authorizationMiddleware(requiredPermission: string) {
  const rolesRepository = new RolesRepository();

  return middlewareAdapter(
    new AuthorizationMiddleware(requiredPermission, rolesRepository)
  );
}
