import { TreatmentsRepository } from '../../../repositories';
import { GetTreatmentByIdUseCase } from '../../../useCases';

export function getTreatmentByIdUseCase() {
  const treatmentsRepository = new TreatmentsRepository();
  return new GetTreatmentByIdUseCase(treatmentsRepository);
}
