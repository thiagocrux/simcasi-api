import { PatientsRepository } from '../../../repositories';
import { UpdatePatientUseCase } from '../../../useCases';

export function updatePatientUseCase() {
  return new UpdatePatientUseCase(PatientsRepository);
}
