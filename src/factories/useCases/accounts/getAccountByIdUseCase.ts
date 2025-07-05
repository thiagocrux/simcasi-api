import { AccountsRepository } from '../../../repositories';
import { GetAccountByIdUseCase } from '../../../useCases';

export function getAccountByIdUseCase() {
  const accountsRepository = new AccountsRepository();
  return new GetAccountByIdUseCase(accountsRepository);
}
