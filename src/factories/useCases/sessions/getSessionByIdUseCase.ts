import { SessionsRepository } from '../../../repositories';
import { GetSessionByIdUseCase } from '../../../useCases';

export function getSessionByIdUseCase() {
  return new GetSessionByIdUseCase(SessionsRepository);
}
