import { CreateTreatmentUseCase } from '../../../useCases';

import {
  PatientsRepository,
  TreatmentsRepository,
} from '../../../repositories';

export function createTreatmentUseCase() {
  const treatmentsRepository = new TreatmentsRepository();
  const patientsRepository = new PatientsRepository();
  return new CreateTreatmentUseCase(treatmentsRepository, patientsRepository);
}
