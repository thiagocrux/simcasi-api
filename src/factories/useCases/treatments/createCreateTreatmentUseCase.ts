import { TreatmentsRepository } from '../../../repositories';
import { CreateTreatmentUseCase } from '../../../useCases';

export function createCreateTreatmentUseCase() {
  return new CreateTreatmentUseCase(TreatmentsRepository);
}
