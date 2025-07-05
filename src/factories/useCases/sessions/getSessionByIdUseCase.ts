import { SessionsRepository } from '../../../repositories';
import { GetSessionByIdUseCase } from '../../../useCases';

export function getSessionByIdUseCase() {
  const sessionsRepository = new SessionsRepository();
  return new GetSessionByIdUseCase(sessionsRepository);
}
