import { middlewareAdapter } from '../../adapters';
import { AuthenticationMiddleware } from '../../middlewares';

export function authenticationMiddleware() {
  return middlewareAdapter(new AuthenticationMiddleware());
}
