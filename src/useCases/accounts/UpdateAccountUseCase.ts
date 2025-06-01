import { isValidObjectId } from 'mongoose';

import { AccountsRepository, UpdateAccountDTO } from '../../types';

import {
  InvalidIdentifierError,
  NotFoundError,
  UniqueEmailViolationError,
} from '../../utils';

export class UpdateAccountUseCase {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(id: string, body: UpdateAccountDTO) {
    const { name, email, password, role } = body;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const account = await this.accountsRepository.find({ _id: id });

    if (!account) {
      throw new NotFoundError('account');
    }

    if (account?.email !== email) {
      const isEmailTaken = await this.accountsRepository.find({ email });

      if (isEmailTaken) {
        throw new UniqueEmailViolationError();
      }
    }

    const updatedAccount = await this.accountsRepository.update(
      { _id: id },
      {
        name,
        email,
        password,
        role,
      }
    );

    return updatedAccount;
  }
}
