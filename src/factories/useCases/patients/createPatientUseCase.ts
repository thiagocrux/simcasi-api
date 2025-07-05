import { PatientsRepository } from '../../../repositories';
import { CreatePatientUseCase } from '../../../useCases';

export function createPatientUseCase() {
  return new CreatePatientUseCase(PatientsRepository);
}
