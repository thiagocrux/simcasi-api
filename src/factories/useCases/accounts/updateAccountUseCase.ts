import { AccountsRepository } from '../../../repositories';
import { UpdateAccountUseCase } from '../../../useCases';

export function updateAccountUseCase() {
  return new UpdateAccountUseCase(AccountsRepository);
}
