import { AccountsRepository } from '../../../repositories';
import { DeleteAccountUseCase } from '../../../useCases';

export function createDeleteAccountUseCase() {
  return new DeleteAccountUseCase(AccountsRepository);
}
