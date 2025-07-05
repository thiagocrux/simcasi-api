import { AccountsRepository, SessionsRepository } from '../../../repositories';
import { GenerateNewAccessTokenUseCase } from '../../../useCases';

export function generateNewAccessTokenUseCase() {
  return new GenerateNewAccessTokenUseCase(
    SessionsRepository,
    AccountsRepository
  );
}
