import { PatientsRepository } from '../../../repositories';
import { CreatePatientUseCase } from '../../../useCases';

export function createPatientUseCase() {
  const patientsRepository = new PatientsRepository();
  return new CreatePatientUseCase(patientsRepository);
}
