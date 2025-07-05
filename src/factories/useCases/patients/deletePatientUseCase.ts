import { PatientsRepository } from '../../../repositories';
import { DeletePatientUseCase } from '../../../useCases';

export function deletePatientUseCase() {
  return new DeletePatientUseCase(PatientsRepository);
}
