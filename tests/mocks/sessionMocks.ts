import { vi } from 'vitest';

export const mockSessionsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreateSessionDTO = {
  email: 'fulano@gmail.com',
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
  isActive: false,
  issuedAt: '2025-06-04T23:53:17.120Z',
  expiresAt: '2025-06-11T23:53:17.120Z',
  createdAt: '2025-06-04T23:53:17.127Z',
  updatedAt: '2025-06-04T23:53:33.215Z',
  __v: 0,
} as const;
