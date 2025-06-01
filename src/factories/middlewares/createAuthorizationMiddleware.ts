import { middlewareAdapter } from '../../adapters';
import { AuthorizationMiddleware } from '../../middlewares';

export function createAuthorizationMiddleware(requiredPermissions: string[]) {
  return middlewareAdapter(new AuthorizationMiddleware(requiredPermissions));
}
