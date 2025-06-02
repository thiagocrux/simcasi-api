import { WithObjectId, WithTimestamps, WithVersion } from './common';

export type AccountRole = 'admin' | 'user' | 'viewer';

export interface Role {
  name: string;
  permissions: string[];
}

export interface CreateRoleDTO extends Omit<Role, 'permissions'> {}
export interface UpdateRoleDTO extends Partial<Role> {}

export interface RoleFilter
  extends Partial<Role>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}
