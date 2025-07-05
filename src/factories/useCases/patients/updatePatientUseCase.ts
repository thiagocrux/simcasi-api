import { PatientsRepository } from '../../../repositories';
import { UpdatePatientUseCase } from '../../../useCases';

export function updatePatientUseCase() {
  const patientsRepository = new PatientsRepository();
  return new UpdatePatientUseCase(patientsRepository);
}
