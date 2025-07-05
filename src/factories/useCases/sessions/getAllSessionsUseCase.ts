import { SessionsRepository } from '../../../repositories';
import { GetAllSessionsUseCase } from '../../../useCases';

export function getAllSessionsUseCase() {
  return new GetAllSessionsUseCase(SessionsRepository);
}
