import { vi } from 'vitest';

export const mockMedicationsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreateMedicationDTO = {
  medication: 'Penicilina Benzatina',
  healthCenter: 'UBS Jardim Primavera',
  startDate: '2023-10-20',
  dosage: '2.4 milhões UI, dose única',
  observations: 'Paciente apresentou alergia à penicilina na anamnese',
  partnerInformation: 'Parceiro notificado para realizar exames',
  patient: '507f1f77bcf86cd799439011',
} as const;

export const mockUpdateMedicationDTO = {
  medication: 'Penicilina Benzatina',
  healthCenter: 'UBS Jardim Primavera',
  dosage: '2.4 milhões UI, dose única',
  observations: 'Paciente apresentou alergia à penicilina na anamnese',
} as const;

export const mockMedicationDocument = {
  _id: '68543a7700151eba4c6270b8',
  medication: 'Penicilina Benzatina',
  healthCenter: 'UBS Jardim Primavera',
  startDate: '2023-10-20',
  dosage: '2.4 milhões UI, dose única',
  observations: 'Paciente apresentou alergia à penicilina na anamnese',
  partnerInformation: 'Parceiro notificado para realizar exames',
  patient: '507f1f77bcf86cd799439011',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _v: 0,
} as const;
