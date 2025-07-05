import { ObservationsRepository } from '../../../repositories';
import { GetObservationByIdUseCase } from '../../../useCases';

export function getObservationByIdUseCase() {
  const observationsRepository = new ObservationsRepository();
  return new GetObservationByIdUseCase(observationsRepository);
}
