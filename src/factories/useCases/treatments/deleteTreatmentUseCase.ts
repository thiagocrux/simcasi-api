import { TreatmentsRepository } from '../../../repositories';
import { DeleteTreatmentUseCase } from '../../../useCases';

export function deleteTreatmentUseCase() {
  const treatmentsRepository = new TreatmentsRepository();
  return new DeleteTreatmentUseCase(treatmentsRepository);
}
