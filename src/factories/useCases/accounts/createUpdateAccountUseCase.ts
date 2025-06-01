import { AccountsRepository } from '../../../repositories';
import { UpdateAccountUseCase } from '../../../useCases';

export function createUpdateAccountUseCase() {
  return new UpdateAccountUseCase(AccountsRepository);
}
