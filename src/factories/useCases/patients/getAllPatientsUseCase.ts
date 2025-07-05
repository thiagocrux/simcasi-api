import { PatientsRepository } from '../../../repositories';
import { GetAllPatientsUseCase } from '../../../useCases';

export function getAllPatientsUseCase() {
  const patientsRepository = new PatientsRepository();
  return new GetAllPatientsUseCase(patientsRepository);
}
