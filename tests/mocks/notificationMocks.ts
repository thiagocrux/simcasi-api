import { vi } from 'vitest';

export const mockNotificationsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  findAllByPatient: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreateNotificationDTO = {
  sinan: '1234567890',
  observations: 'Caso confirmado por exame laboratorial',
  patient: '507f1f77bcf86cd799439011',
} as const;

export const mockUpdateNotificationDTO = {
  observations: 'Caso confirmado por exame laboratorial',
} as const;

export const mockNotificationDocument = {
  _id: '68543a7700151eba4c6270b8',
  sinan: '1234567890',
  observations: 'Caso confirmado por exame laboratorial',
  patient: '507f1f77bcf86cd799439011',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _v: 0,
} as const;
