import { AccountsRepository, SessionsRepository } from '../../../repositories';
import { CreateSessionUseCase } from '../../../useCases';

export function createCreateSessionUseCase() {
  return new CreateSessionUseCase(SessionsRepository, AccountsRepository);
}
