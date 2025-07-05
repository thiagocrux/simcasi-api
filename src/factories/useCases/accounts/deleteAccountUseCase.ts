import { AccountsRepository } from '../../../repositories';
import { DeleteAccountUseCase } from '../../../useCases';

export function deleteAccountUseCase() {
  const accountsRepository = new AccountsRepository();
  return new DeleteAccountUseCase(accountsRepository);
}
