import { AccountsRepository } from '../../../repositories';
import { GetAllAccountsUseCase } from '../../../useCases';

export function getAllAccountsUseCase() {
  return new GetAllAccountsUseCase(AccountsRepository);
}
