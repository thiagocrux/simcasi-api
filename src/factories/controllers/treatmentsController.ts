import { TreatmentsController } from '../../controllers';

import {
  createTreatmentUseCase,
  deleteTreatmentUseCase,
  getAllTreatmentsByPatientUseCase,
  getAllTreatmentsUseCase,
  getTreatmentByIdUseCase,
  updateTreatmentUseCase,
} from '..';

export function treatmentsController() {
  return new TreatmentsController(
    createTreatmentUseCase(),
    deleteTreatmentUseCase(),
    getAllTreatmentsUseCase(),
    getAllTreatmentsByPatientUseCase(),
    getTreatmentByIdUseCase(),
    updateTreatmentUseCase()
  );
}
