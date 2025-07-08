import { AccountsController } from '../../controllers';

import {
  createAccountUseCase,
  deleteAccountUseCase,
  getAccountByIdUseCase,
  getAllAccountsUseCase,
  updateAccountUseCase,
} from '..';

export function accountsController() {
  return new AccountsController(
    createAccountUseCase(),
    deleteAccountUseCase(),
    getAccountByIdUseCase(),
    getAllAccountsUseCase(),
    updateAccountUseCase()
  );
}
