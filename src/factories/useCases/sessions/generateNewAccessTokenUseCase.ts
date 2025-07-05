import { AccountsRepository, SessionsRepository } from '../../../repositories';
import { GenerateNewAccessTokenUseCase } from '../../../useCases';

export function generateNewAccessTokenUseCase() {
  const sessionsRepository = new SessionsRepository();
  const accountsRepository = new AccountsRepository();

  return new GenerateNewAccessTokenUseCase(
    sessionsRepository,
    accountsRepository
  );
}
