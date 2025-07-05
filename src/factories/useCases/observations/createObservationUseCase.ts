import { CreateObservationUseCase } from '../../../useCases';

import {
  ObservationsRepository,
  PatientsRepository,
} from '../../../repositories';

export function createObservationUseCase() {
  return new CreateObservationUseCase(
    ObservationsRepository,
    PatientsRepository
  );
}
