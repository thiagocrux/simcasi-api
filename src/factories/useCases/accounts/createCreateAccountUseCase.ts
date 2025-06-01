import { AccountsRepository } from '../../../repositories';
import { CreateAccountUseCase } from '../../../useCases';

export function createCreateAccountUseCase() {
  return new CreateAccountUseCase(AccountsRepository);
}
