import { TreatmentsRepository } from '../../../repositories';
import { DeleteTreatmentUseCase } from '../../../useCases';

export function createDeleteTreatmentUseCase() {
  return new DeleteTreatmentUseCase(TreatmentsRepository);
}
