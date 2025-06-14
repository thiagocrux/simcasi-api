import { PatientsRepository } from '../../../repositories';
import { DeletePatientUseCase } from '../../../useCases';

export function createDeletePatientUseCase() {
  return new DeletePatientUseCase(PatientsRepository);
}
