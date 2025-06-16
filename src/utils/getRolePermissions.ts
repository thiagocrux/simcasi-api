import { AccountRole } from '../types';
import { PERMISSIONS } from '../validations';

const unauthorizedPermissions: Record<string, string[]> = {
  admin: [],
  user: ['accounts:create', 'accounts:delete'],
  viewer: ['accounts:read'],
};

export function getRolePermissions(role: AccountRole) {
  const adminPermissions: string[] = [];
  const userPermissions: string[] = [];
  const viewerPermissions: string[] = [];

  PERMISSIONS.forEach((permission) => {
    if (permission) {
      if (!unauthorizedPermissions['admin'].includes(permission)) {
        adminPermissions.push(permission);
      }

      if (!unauthorizedPermissions['user'].includes(permission)) {
        userPermissions.push(permission);
      }

      if (
        permission.endsWith('read') &&
        !unauthorizedPermissions['viewer'].includes(permission)
      ) {
        viewerPermissions.push(permission);
      }
    }
  });

  const roleAllowedPermissions: Record<string, string[]> = {
    admin: adminPermissions,
    user: userPermissions,
    viewer: viewerPermissions,
  };

  return roleAllowedPermissions[role];
}
