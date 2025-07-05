import { AccountsRepository, SessionsRepository } from '../../../repositories';
import { CreateSessionUseCase } from '../../../useCases';

export function createSessionUseCase() {
  return new CreateSessionUseCase(SessionsRepository, AccountsRepository);
}
