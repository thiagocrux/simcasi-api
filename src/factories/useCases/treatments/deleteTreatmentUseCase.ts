import { TreatmentsRepository } from '../../../repositories';
import { DeleteTreatmentUseCase } from '../../../useCases';

export function deleteTreatmentUseCase() {
  return new DeleteTreatmentUseCase(TreatmentsRepository);
}
