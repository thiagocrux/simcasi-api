import { PatientsController } from '../../controllers';

import {
  createPatientUseCase,
  deletePatientUseCase,
  getAllPatientsUseCase,
  getPatientByIdUseCase,
  updatePatientUseCase,
} from '..';

export function patientsController() {
  return new PatientsController(
    createPatientUseCase(),
    deletePatientUseCase(),
    getAllPatientsUseCase(),
    getPatientByIdUseCase(),
    updatePatientUseCase()
  );
}
