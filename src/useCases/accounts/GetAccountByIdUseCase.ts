import { isValidObjectId } from 'mongoose';

import { AccountsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetAccountByIdUseCase {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const account = await this.accountsRepository.find({ _id: id });

    if (!account) {
      throw new NotFoundError('account');
    }

    return account;
  }
}
