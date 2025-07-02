import { SessionsRepository } from '../../../repositories';
import { GetSessionByIdUseCase } from '../../../useCases';

export function createGetSessionByIdUseCase() {
  return new GetSessionByIdUseCase(SessionsRepository);
}
