import { vi } from 'vitest';
import { PERMISSIONS } from '../../src/schemas';

export const mockRolesRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreateRoleDTO = {
  name: 'user',
} as const;

export const mockUpdateRoleDTO = {
  name: 'user',
} as const;

export const mockRoleDocument = {
  _id: '68543a7700151eba4c6270b8',
  name: 'user',
  permissions: [...PERMISSIONS],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _v: 0,
} as const;
