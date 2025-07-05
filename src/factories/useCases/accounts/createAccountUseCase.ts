import { AccountsRepository } from '../../../repositories';
import { CreateAccountUseCase } from '../../../useCases';

export function createAccountUseCase() {
  const accountsRepository = new AccountsRepository();
  return new CreateAccountUseCase(accountsRepository);
}
