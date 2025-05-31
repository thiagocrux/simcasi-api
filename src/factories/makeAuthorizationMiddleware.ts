import { AuthorizationMiddleware } from '../middlewares';

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  return new AuthorizationMiddleware(requiredPermissions);
}
