import { AccountsRepository, SessionsRepository } from '../../../repositories';
import { GenerateNewAccessTokenUseCase } from '../../../useCases';

export function createGenerateNewAccessTokenUseCase() {
  return new GenerateNewAccessTokenUseCase(
    SessionsRepository,
    AccountsRepository
  );
}
