import { ObservationsRepository } from '../../../repositories';
import { GetAllObservationsByPatientUseCase } from '../../../useCases';

export function getAllObservationsByPatientUseCase() {
  const observationsRepository = new ObservationsRepository();
  return new GetAllObservationsByPatientUseCase(observationsRepository);
}
