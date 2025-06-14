import { TreatmentsRepository } from '../../../repositories';
import { UpdateTreatmentUseCase } from '../../../useCases';

export function createUpdateTreatmentUseCase() {
  return new UpdateTreatmentUseCase(TreatmentsRepository);
}
