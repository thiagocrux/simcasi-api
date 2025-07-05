import { CreateObservationUseCase } from '../../../useCases';

import {
  ObservationsRepository,
  PatientsRepository,
} from '../../../repositories';

export function createObservationUseCase() {
  const observationsRepository = new ObservationsRepository();
  const patientsRepository = new PatientsRepository();

  return new CreateObservationUseCase(
    observationsRepository,
    patientsRepository
  );
}
