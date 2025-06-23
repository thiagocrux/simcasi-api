import { vi } from 'vitest';

export const mockSessionsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockDeviceInfo = {
  ipAddress: '::1',
  userAgent: 'PostmanRuntime/7.44.0',
} as const;

export const mockCreateSessionDTO = {
  email: 'fulano-detail@gmail.com',
  password: 'Teste@12',
} as const;

export const mockUpdateSessionDTO = {
  isActive: false,
} as const;

export const mockSessionDocument = {
  deviceInfo: {
    ipAddress: '::1',
    userAgent: 'PostmanRuntime/7.44.0',
  },
  _id: '6840dc6db003b4c6b7fe29c6',
  accountId: '683cc6b063bb1ed787c7100e',
  isActive: true,
  issuedAt: new Date(Date.now()),
  expiresAt: new Date(Date.now() + 900000),
  createdAt: '2025-06-04T23:53:17.127Z',
  updatedAt: '2025-06-04T23:53:33.215Z',
  __v: 0,
} as const;
