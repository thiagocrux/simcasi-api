import { Types } from 'mongoose';
import { WithObjectId, WithTimestamps, WithVersion } from './common';
import { AccountRole } from './roles';

export interface Account {
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId;
}

export interface CreateAccountDTO extends Omit<Account, 'role'> {
  role?: AccountRole;
}

export interface UpdateAccountDTO extends Partial<Account> {}

export interface AccountFilter
  extends Partial<Account>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}
