import { SessionsRepository } from '../../../repositories';
import { GetAllSessionsUseCase } from '../../../useCases';

export function getAllSessionsUseCase() {
  const sessionsRepository = new SessionsRepository();
  return new GetAllSessionsUseCase(sessionsRepository);
}
