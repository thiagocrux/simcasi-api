import { vi } from 'vitest';

export const mockObservationsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  findAllByPatient: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreateObservationDTO = {
  observations: 'Paciente compareceu para acompanhamento pós-tratamento',
  partnerBeingTreated: true,
  patient: '507f1f77bcf86cd799439011',
} as const;

export const mockUpdateObservationDTO = {
  observations: 'Paciente compareceu para acompanhamento pós-tratamento',
  partnerBeingTreated: true,
} as const;

export const mockObservationDocument = {
  _id: '68543a7700151eba4c6270b8',
  observations: 'Paciente compareceu para acompanhamento pós-tratamento',
  partnerBeingTreated: true,
  patient: '507f1f77bcf86cd799439011',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _v: 0,
} as const;
