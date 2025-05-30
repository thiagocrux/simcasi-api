import { Account } from '../models';
import { AccountFilter, CreateAccountDTO, UpdateAccountDTO } from '../types';

export class AccountsRepository {
  static async findAll(order: 'asc' | 'desc') {
    const accounts = await Account.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return accounts;
  }

  static async find(filter: AccountFilter) {
    const account = await Account.findOne(filter);
    return account;
  }

  static async create(body: CreateAccountDTO) {
    const account = await Account.create(body);
    return account;
  }

  static async update(filter: AccountFilter, body: UpdateAccountDTO) {
    const account = await Account.findOneAndUpdate(filter, body, {
      new: true,
    });

    return account;
  }

  static async delete(id: string) {
    const role = await Account.findByIdAndDelete(id);
    return role;
  }
}
