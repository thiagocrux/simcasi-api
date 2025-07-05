import { AccountsRepository, SessionsRepository } from '../../../repositories';
import { CreateSessionUseCase } from '../../../useCases';

export function createSessionUseCase() {
  const sessionsRepository = new SessionsRepository();
  const accountsRepository = new AccountsRepository();
  return new CreateSessionUseCase(sessionsRepository, accountsRepository);
}
