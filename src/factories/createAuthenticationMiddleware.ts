import { middlewareAdapter } from '../adapters';
import { AuthenticationMiddleware } from '../middlewares';

export function createAuthenticationMiddleware() {
  return middlewareAdapter(new AuthenticationMiddleware());
}
