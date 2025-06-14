import { TreatmentsRepository } from '../../../repositories';
import { GetAllTreatmentsUseCase } from '../../../useCases';

export function createGetAllTreatmentsUseCase() {
  return new GetAllTreatmentsUseCase(TreatmentsRepository);
}
