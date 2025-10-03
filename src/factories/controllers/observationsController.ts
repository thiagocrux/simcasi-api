import { ObservationsController } from '../../controllers';

import {
  createObservationUseCase,
  deleteObservationUseCase,
  getAllObservationsByPatientUseCase,
  getAllObservationsUseCase,
  getObservationByIdUseCase,
  updateObservationUseCase,
} from '..';

export function observationsController() {
  return new ObservationsController(
    createObservationUseCase(),
    deleteObservationUseCase(),
    getAllObservationsUseCase(),
    getAllObservationsByPatientUseCase(),
    getObservationByIdUseCase(),
    updateObservationUseCase()
  );
}
