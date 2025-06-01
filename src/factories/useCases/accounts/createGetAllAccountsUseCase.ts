import { AccountsRepository } from '../../../repositories';
import { GetAllAccountsUseCase } from '../../../useCases';

export function createGetAllAccountsUseCase() {
  return new GetAllAccountsUseCase(AccountsRepository);
}
