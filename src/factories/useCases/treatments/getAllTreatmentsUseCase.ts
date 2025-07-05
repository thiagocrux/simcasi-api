import { TreatmentsRepository } from '../../../repositories';
import { GetAllTreatmentsUseCase } from '../../../useCases';

export function getAllTreatmentsUseCase() {
  return new GetAllTreatmentsUseCase(TreatmentsRepository);
}
