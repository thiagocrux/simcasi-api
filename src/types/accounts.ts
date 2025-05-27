import { WithObjectId, WithTimestamps, WithVersion } from './common';
import { AccountRole } from './roles';

export interface Account {
  name: string;
  email: string;
  password: string;
  role: AccountRole;
}

export interface CreateAccountDTO extends Account {}
export interface UpdateAccountDTO extends Partial<Account> {}

export interface AccountFilter
  extends Partial<Account>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}
