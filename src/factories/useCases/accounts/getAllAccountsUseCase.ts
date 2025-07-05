import { AccountsRepository } from '../../../repositories';
import { GetAllAccountsUseCase } from '../../../useCases';

export function getAllAccountsUseCase() {
  const accountsRepository = new AccountsRepository();
  return new GetAllAccountsUseCase(accountsRepository);
}
