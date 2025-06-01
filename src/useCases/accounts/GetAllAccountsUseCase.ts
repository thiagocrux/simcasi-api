import { AccountsRepository } from '../../types';

export class GetAllAccountsUseCase {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const accounts = await this.accountsRepository.findAll(order);
    return accounts;
  }
}
