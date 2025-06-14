import { ObservationsRepository } from '../../../repositories';
import { GetObservationByIdUseCase } from '../../../useCases';

export function createGetObservationByIdUseCase() {
  return new GetObservationByIdUseCase(ObservationsRepository);
}
