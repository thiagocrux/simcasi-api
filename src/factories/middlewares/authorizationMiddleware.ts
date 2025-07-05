import { middlewareAdapter } from '../../adapters';
import { AuthorizationMiddleware } from '../../middlewares';

export function authorizationMiddleware(requiredPermission: string) {
  return middlewareAdapter(new AuthorizationMiddleware(requiredPermission));
}
