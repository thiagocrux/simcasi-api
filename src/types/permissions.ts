import { WithObjectId, WithTimestamps, WithVersion } from './common';

export type PermissionCodes =
  | 'accounts:create'
  | 'accounts:delete'
  | 'accounts:read'
  | 'accounts:update'
  | 'exams:create'
  | 'exams:delete'
  | 'exams:read'
  | 'exams:update'
  | 'notifications:create'
  | 'notifications:delete'
  | 'notifications:read'
  | 'notifications:update'
  | 'observations:create'
  | 'observations:delete'
  | 'observations:read'
  | 'observations:update'
  | 'patients:create'
  | 'patients:delete'
  | 'patients:read'
  | 'patients:update'
  | 'permissions:create'
  | 'permissions:delete'
  | 'permissions:read'
  | 'permissions:update'
  | 'roles:create'
  | 'roles:delete'
  | 'roles:read'
  | 'roles:update'
  | 'treatments:create'
  | 'treatments:delete'
  | 'treatments:read'
  | 'treatments:update';

export interface Permission {
  code: PermissionCodes;
}

export interface CreatePermissionDTO extends Permission {}
export interface UpdatePermissionDTO extends Partial<Permission> {}

export interface PermissionFilter
  extends Partial<Permission>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}
