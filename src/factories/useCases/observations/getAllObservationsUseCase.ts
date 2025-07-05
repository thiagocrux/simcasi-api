import { ObservationsRepository } from '../../../repositories';
import { GetAllObservationsUseCase } from '../../../useCases';

export function getAllObservationsUseCase() {
  const observationsRepository = new ObservationsRepository();
  return new GetAllObservationsUseCase(observationsRepository);
}
