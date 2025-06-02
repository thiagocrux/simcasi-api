import { SessionsRepository } from '../../../repositories';
import { GetAllSessionsUseCase } from '../../../useCases';

export function createGetAllSessionsUseCase() {
  return new GetAllSessionsUseCase(SessionsRepository);
}
