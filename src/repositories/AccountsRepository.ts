import { Account } from '../models';
import { AccountFilter, CreateAccountDTO, UpdateAccountDTO } from '../types';

class AccountsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const accounts = await Account.find().sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return accounts;
  }

  public async find(filter: AccountFilter) {
    const account = await Account.findOne(filter);
    return account;
  }

  public async create(body: CreateAccountDTO) {
    const account = await Account.create(body);
    return account;
  }

  public async update(filter: AccountFilter, body: UpdateAccountDTO) {
    const account = await Account.findOneAndUpdate(filter, body, {
      new: true,
    });

    return account;
  }

  public async delete(filter: AccountFilter) {
    await Account.findOneAndDelete(filter);
  }
}

export default new AccountsRepository();
