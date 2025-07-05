import { TreatmentsRepository } from '../../../repositories';
import { UpdateTreatmentUseCase } from '../../../useCases';

export function updateTreatmentUseCase() {
  const treatmentsRepository = new TreatmentsRepository();
  return new UpdateTreatmentUseCase(treatmentsRepository);
}
