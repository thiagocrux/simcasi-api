import { CreateTreatmentUseCase } from '../../../useCases';

import {
  PatientsRepository,
  TreatmentsRepository,
} from '../../../repositories';

export function createCreateTreatmentUseCase() {
  return new CreateTreatmentUseCase(TreatmentsRepository, PatientsRepository);
}
