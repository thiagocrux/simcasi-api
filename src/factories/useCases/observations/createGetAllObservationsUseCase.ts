import { ObservationsRepository } from '../../../repositories';
import { GetAllObservationsUseCase } from '../../../useCases';

export function createGetAllObservationsUseCase() {
  return new GetAllObservationsUseCase(ObservationsRepository);
}
