import { TreatmentsRepository } from '../../../repositories';
import { UpdateTreatmentUseCase } from '../../../useCases';

export function updateTreatmentUseCase() {
  return new UpdateTreatmentUseCase(TreatmentsRepository);
}
