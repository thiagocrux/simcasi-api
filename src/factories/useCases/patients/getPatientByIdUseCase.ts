import { PatientsRepository } from '../../../repositories';
import { GetPatientByIdUseCase } from '../../../useCases';

export function getPatientByIdUseCase() {
  const patientsRepository = new PatientsRepository();
  return new GetPatientByIdUseCase(patientsRepository);
}
