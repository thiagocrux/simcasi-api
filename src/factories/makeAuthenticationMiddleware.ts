import { AuthenticationMiddleware } from '../middlewares';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
