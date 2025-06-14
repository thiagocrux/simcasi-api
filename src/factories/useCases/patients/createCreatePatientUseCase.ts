import { PatientsRepository } from '../../../repositories';
import { CreatePatientUseCase } from '../../../useCases';

export function createCreatePatientUseCase() {
  return new CreatePatientUseCase(PatientsRepository);
}
