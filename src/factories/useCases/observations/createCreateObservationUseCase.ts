import { ObservationsRepository } from '../../../repositories';
import { CreateObservationUseCase } from '../../../useCases';

export function createCreateObservationUseCase() {
  return new CreateObservationUseCase(ObservationsRepository);
}
