import { ObservationsController } from '../../controllers';

import {
  createObservationUseCase,
  deleteObservationUseCase,
  getAllObservationsUseCase,
  getObservationByIdUseCase,
  updateObservationUseCase,
} from '..';

export function observationsController() {
  return new ObservationsController(
    createObservationUseCase(),
    deleteObservationUseCase(),
    getAllObservationsUseCase(),
    getObservationByIdUseCase(),
    updateObservationUseCase()
  );
}
