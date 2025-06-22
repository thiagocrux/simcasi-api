import { vi } from 'vitest';

export const mockPermissionsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreatePermissionDTO = {
  code: 'test:read',
} as const;

export const mockUpdatePermissionDTO = {
  code: 'test:read',
} as const;

export const mockPermissionDocument = {
  _id: '68543a7700151eba4c6270b8',
  code: 'test:read',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _v: 0,
} as const;
