import { vi } from 'vitest';

export const mockAccountsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreateAccountDTO = {
  name: 'Fulano Detail',
  email: 'fulano-detail@gmail.com',
  password: 'Teste@12',
  role: 'user',
} as const;

export const mockUpdateAccountDTO = {
  name: 'Fulano Detail',
  email: 'fulano-detail@gmail.com',
  password: 'Teste@12',
} as const;

export const mockAccountDocument = {
  _id: '68543a7700151eba4c6270b8',
  name: 'Fulano Detail',
  email: 'fulano-detail@gmail.com',
  password: 'Teste@12',
  role: 'user',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _v: 0,
} as const;
