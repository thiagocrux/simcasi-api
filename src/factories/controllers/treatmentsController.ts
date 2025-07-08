import { TreatmentsController } from '../../controllers';

import {
  createTreatmentUseCase,
  deleteTreatmentUseCase,
  getAllTreatmentsUseCase,
  getTreatmentByIdUseCase,
  updateTreatmentUseCase,
} from '..';

export function treatmentsController() {
  return new TreatmentsController(
    createTreatmentUseCase(),
    deleteTreatmentUseCase(),
    getAllTreatmentsUseCase(),
    getTreatmentByIdUseCase(),
    updateTreatmentUseCase()
  );
}
