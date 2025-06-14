import { PatientsRepository } from '../../../repositories';
import { GetPatientByIdUseCase } from '../../../useCases';

export function createGetPatientByIdUseCase() {
  return new GetPatientByIdUseCase(PatientsRepository);
}
