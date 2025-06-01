import bcrypt from 'bcryptjs';

import { AccountsRepository, CreateAccountDTO } from '../../types';
import { UniqueConstraintViolationError } from '../../utils';

export class CreateAccountUseCase {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute({ name, email, password, role }: CreateAccountDTO) {
    const accountAlreadyExists = await this.accountsRepository.find({ email });

    if (accountAlreadyExists) {
      throw new UniqueConstraintViolationError('account');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const account = await this.accountsRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    return account;
  }
}
