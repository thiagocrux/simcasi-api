import { TreatmentsRepository } from '../../../repositories';
import { GetTreatmentByIdUseCase } from '../../../useCases';

export function getTreatmentByIdUseCase() {
  return new GetTreatmentByIdUseCase(TreatmentsRepository);
}
