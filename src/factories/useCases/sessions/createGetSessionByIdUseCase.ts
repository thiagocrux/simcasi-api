import { SessionsRepository } from '../../../repositories';
import { GetAllSessionsUseCase } from '../../../useCases';

export function createGetSessionByIdUseCase() {
  return new GetAllSessionsUseCase(SessionsRepository);
}
