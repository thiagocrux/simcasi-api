import { AccountsRepository } from '../../../repositories';
import { CreateAccountUseCase } from '../../../useCases';

export function createAccountUseCase() {
  return new CreateAccountUseCase(AccountsRepository);
}
