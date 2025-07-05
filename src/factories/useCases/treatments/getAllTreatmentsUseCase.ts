import { TreatmentsRepository } from '../../../repositories';
import { GetAllTreatmentsUseCase } from '../../../useCases';

export function getAllTreatmentsUseCase() {
  const treatmentsRepository = new TreatmentsRepository();
  return new GetAllTreatmentsUseCase(treatmentsRepository);
}
