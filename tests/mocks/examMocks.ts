import { vi } from 'vitest';

export const mockExamsRepository = {
  find: vi.fn(),
  findAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const mockCreateExamDTO = {
  treponemalTestType: 'FTA-ABS',
  treponemalTestResult: 'Reagente',
  treponemalTestDate: '2023-10-15',
  treponemalTestLocation: 'Laboratório Central de Saúde Pública',
  nontreponemalVdrlTest: 'Positivo',
  nontreponemalTestTitration: '1:16',
  nontreponemalTestDate: '2023-10-10',
  otherNontreponemalTest: null,
  otherNontreponemalTestDate: null,
  referenceObservations: 'Paciente encaminhado para tratamento',
  patient: '507f1f77bcf86cd799439011',
} as const;

export const mockUpdateExamDTO = {
  treponemalTestType: 'FTA-ABS',
  treponemalTestResult: 'Reagente',
  treponemalTestDate: '2023-10-15',
  treponemalTestLocation: 'Laboratório Central de Saúde Pública',
  nontreponemalVdrlTest: 'Positivo',
  nontreponemalTestTitration: '1:16',
  nontreponemalTestDate: '2023-10-10',
  otherNontreponemalTest: null,
  otherNontreponemalTestDate: null,
  referenceObservations: 'Paciente encaminhado para tratamento',
  patient: '507f1f77bcf86cd799439011',
} as const;

export const mockExamDocument = {
  _id: '68543a7700151eba4c6270b8',
  treponemalTestType: 'FTA-ABS',
  treponemalTestResult: 'Reagente',
  treponemalTestDate: '2023-10-15',
  treponemalTestLocation: 'Laboratório Central de Saúde Pública',
  nontreponemalVdrlTest: 'Positivo',
  nontreponemalTestTitration: '1:16',
  nontreponemalTestDate: '2023-10-10',
  otherNontreponemalTest: null,
  otherNontreponemalTestDate: null,
  referenceObservations: 'Paciente encaminhado para tratamento',
  patient: '507f1f77bcf86cd799439011',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _v: 0,
} as const;
