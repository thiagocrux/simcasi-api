import { PatientsRepository } from '../../../repositories';
import { GetAllPatientsUseCase } from '../../../useCases';

export function getAllPatientsUseCase() {
  return new GetAllPatientsUseCase(PatientsRepository);
}
