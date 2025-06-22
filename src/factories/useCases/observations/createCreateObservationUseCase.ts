import { CreateObservationUseCase } from '../../../useCases';

import {
  ObservationsRepository,
  PatientsRepository,
} from '../../../repositories';

export function createCreateObservationUseCase() {
  return new CreateObservationUseCase(
    ObservationsRepository,
    PatientsRepository
  );
}
