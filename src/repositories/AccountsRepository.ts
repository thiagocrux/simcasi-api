import { Account } from '../models';
import { Role } from '../types';

interface CreateAccountDTO {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface UpdateAccountDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export class AccountsRepository {
  static async findAll() {
    const accounts = await Account.find();
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

  static async update(id: string, body: UpdateAccountDTO) {
    const role = await Account.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    return role;
  }

  static async delete(id: string) {
    const role = await Account.findByIdAndDelete(id);
    return role;
  }
}
