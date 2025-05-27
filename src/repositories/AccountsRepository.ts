import { Account } from '../models';
import { AccountFilter, CreateAccountDTO, UpdateAccountDTO } from '../types';

export class AccountsRepository {
  static async findAll(order: 'asc' | 'desc') {
    const accounts = await Account.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return accounts;
  }

  static async findById(id: string) {
    const account = await Account.findById(id);
    return account;
  }

  static async findByEmail(email: string) {
    const account = await Account.findOne({ email });
    return account;
  }

  static async create(body: CreateAccountDTO) {
    const account = await Account.create(body);
    return account;
  }

  static async updateById(id: string, body: UpdateAccountDTO) {
    const role = await Account.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    return role;
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
