import { describe, expect, it } from 'vitest';

import { PERMISSIONS } from '../../../src/schemas';
import { AccountRole } from '../../../src/types';

import {
  getRolePermissions,
  unauthorizedPermissions,
} from '../../../src/utils';

describe('getRolePermissions', () => {
  it('should return all permissions for admin role', () => {
    const result = getRolePermissions('admin');
    expect(result).toEqual(PERMISSIONS);
  });

  it('should return all permissions except unauthorized ones for user role', () => {
    const result = getRolePermissions('user');

    const expected = PERMISSIONS.filter(
      (permission) => !unauthorizedPermissions['user'].includes(permission)
    );

    expect(result).toEqual(expected);
  });

  it('should return only read permissions (except unauthorized ones) for viewer role', () => {
    const result = getRolePermissions('viewer');

    const expected = PERMISSIONS.filter((permission) =>
      permission.endsWith('read')
    ).filter(
      (permission) => !unauthorizedPermissions['viewer'].includes(permission)
    );

    expect(result).toEqual(expected);
  });

  it('should return an empty array for an unknown role', () => {
    const result = getRolePermissions('unknown' as AccountRole);
    expect(result).toEqual([]);
  });
});
