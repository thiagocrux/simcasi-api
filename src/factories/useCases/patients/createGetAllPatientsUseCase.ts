import { PatientsRepository } from '../../../repositories';
import { GetAllPatientsUseCase } from '../../../useCases';

export function createGetAllPatientsUseCase() {
  return new GetAllPatientsUseCase(PatientsRepository);
}
