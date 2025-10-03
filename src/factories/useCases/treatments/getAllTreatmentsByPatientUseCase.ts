import { TreatmentsRepository } from '../../../repositories';
import { GetAllTreatmentsByPatientUseCase } from '../../../useCases';

export function getAllTreatmentsByPatientUseCase() {
  const treatmentsRepository = new TreatmentsRepository();
  return new GetAllTreatmentsByPatientUseCase(treatmentsRepository);
}
