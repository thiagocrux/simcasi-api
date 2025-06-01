import { AccountsRepository } from '../../../repositories';
import { GetAccountByIdUseCase } from '../../../useCases';

export function createGetAccountByIdUseCase() {
  return new GetAccountByIdUseCase(AccountsRepository);
}
