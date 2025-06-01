// accounts-repository.interface.ts
import { AccountFilter, CreateAccountDTO, UpdateAccountDTO } from '../..';
import { AccountDocument } from '../../../models';

export interface AccountsRepository {
  findAll(order: 'asc' | 'desc'): Promise<AccountDocument[]>;
  find(filter: AccountFilter): Promise<AccountDocument | null>;
  create(body: CreateAccountDTO): Promise<AccountDocument>;
  update(
    filter: AccountFilter,
    body: UpdateAccountDTO
  ): Promise<AccountDocument | null>;
  delete(id: string): Promise<AccountDocument | null>;
}
