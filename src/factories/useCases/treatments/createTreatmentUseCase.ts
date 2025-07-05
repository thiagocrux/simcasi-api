import { CreateTreatmentUseCase } from '../../../useCases';

import {
  PatientsRepository,
  TreatmentsRepository,
} from '../../../repositories';

export function createTreatmentUseCase() {
  return new CreateTreatmentUseCase(TreatmentsRepository, PatientsRepository);
}
