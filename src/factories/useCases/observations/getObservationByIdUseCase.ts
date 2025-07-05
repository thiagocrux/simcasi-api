import { ObservationsRepository } from '../../../repositories';
import { GetObservationByIdUseCase } from '../../../useCases';

export function getObservationByIdUseCase() {
  return new GetObservationByIdUseCase(ObservationsRepository);
}
