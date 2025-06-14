import { PatientsRepository } from '../../../repositories';
import { UpdatePatientUseCase } from '../../../useCases';

export function createUpdatePatientUseCase() {
  return new UpdatePatientUseCase(PatientsRepository);
}
