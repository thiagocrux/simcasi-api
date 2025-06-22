import { WithObjectId, WithTimestamps, WithVersion } from './common';
import { PermissionCodes } from './permissions';

export type AccountRole = 'admin' | 'user' | 'viewer';

export interface Role {
  name: string;
  // REFACTOR: Check the permissions implementation in the code (should populate automatically or explicitly during creation?)
  permissions?: PermissionCodes[];
}

export interface CreateRoleDTO extends Role {}
export interface UpdateRoleDTO extends Partial<Role> {}

export interface RoleFilter
  extends Partial<Role>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}
