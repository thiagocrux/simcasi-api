import { TreatmentsRepository } from '../../../repositories';
import { GetTreatmentByIdUseCase } from '../../../useCases';

export function createGetTreatmentByIdUseCase() {
  return new GetTreatmentByIdUseCase(TreatmentsRepository);
}
