import { ObservationsRepository } from '../../../repositories';
import { GetAllObservationsUseCase } from '../../../useCases';

export function getAllObservationsUseCase() {
  return new GetAllObservationsUseCase(ObservationsRepository);
}
