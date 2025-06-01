export const PERMISSIONS = [
  'accounts:create',
  'accounts:delete',
  'accounts:read',
  'accounts:update',
  'exams:create',
  'exams:delete',
  'exams:read',
  'exams:update',
  'notifications:create',
  'notifications:delete',
  'notifications:read',
  'notifications:update',
  'observations:create',
  'observations:delete',
  'observations:read',
  'observations:update',
  'patients:create',
  'patients:delete',
  'patients:read',
  'patients:update',
  'permissions:create',
  'permissions:delete',
  'permissions:read',
  'permissions:update',
  'roles:create',
  'roles:delete',
  'roles:read',
  'roles:update',
  'sessions:create',
  'sessions:delete',
  'sessions:read',
  'sessions:update',
  'treatments:create',
  'treatments:delete',
  'treatments:read',
  'treatments:update',
];

const userPermissions: string[] = [];
const viewerPermissions: string[] = [];

PERMISSIONS.forEach((permission) => {
  if (permission) {
    if (!['accounts:create', 'accounts:delete'].includes(permission)) {
      userPermissions.push(permission);
    }

    if (
      permission.endsWith('read') &&
      !['accounts:read'].includes(permission)
    ) {
      viewerPermissions.push(permission);
    }
  }
});

export const permissionsByRole: Record<string, string[]> = {
  admin: PERMISSIONS,
  user: userPermissions,
  viewer: viewerPermissions,
};
