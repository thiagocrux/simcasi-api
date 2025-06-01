import { middlewareAdapter } from '../../adapters';
import { AuthorizationMiddleware } from '../../middlewares';

export function createAuthorizationMiddleware(requiredPermission: string) {
  return middlewareAdapter(new AuthorizationMiddleware(requiredPermission));
}
