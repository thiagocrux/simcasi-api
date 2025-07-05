import { middlewareAdapter } from '../../adapters';
import { AuthenticationMiddleware } from '../../middlewares';
import { SessionsRepository } from '../../repositories';

export function authenticationMiddleware() {
  const sessionsRepository = new SessionsRepository();
  return middlewareAdapter(new AuthenticationMiddleware(sessionsRepository));
}
