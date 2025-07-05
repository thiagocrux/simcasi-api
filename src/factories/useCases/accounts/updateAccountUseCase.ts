import { AccountsRepository } from '../../../repositories';
import { UpdateAccountUseCase } from '../../../useCases';

export function updateAccountUseCase() {
  const accountsRepository = new AccountsRepository();
  return new UpdateAccountUseCase(accountsRepository);
}
