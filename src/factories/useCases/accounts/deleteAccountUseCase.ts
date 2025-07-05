import { AccountsRepository } from '../../../repositories';
import { DeleteAccountUseCase } from '../../../useCases';

export function deleteAccountUseCase() {
  return new DeleteAccountUseCase(AccountsRepository);
}
