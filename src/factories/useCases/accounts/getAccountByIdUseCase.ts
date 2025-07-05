import { AccountsRepository } from '../../../repositories';
import { GetAccountByIdUseCase } from '../../../useCases';

export function getAccountByIdUseCase() {
  return new GetAccountByIdUseCase(AccountsRepository);
}
