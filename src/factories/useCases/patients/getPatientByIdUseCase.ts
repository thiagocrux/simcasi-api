import { PatientsRepository } from '../../../repositories';
import { GetPatientByIdUseCase } from '../../../useCases';

export function getPatientByIdUseCase() {
  return new GetPatientByIdUseCase(PatientsRepository);
}
