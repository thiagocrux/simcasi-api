import { PatientsRepository } from '../../../repositories';
import { DeletePatientUseCase } from '../../../useCases';

export function deletePatientUseCase() {
  const patientsRepository = new PatientsRepository();
  return new DeletePatientUseCase(patientsRepository);
}
