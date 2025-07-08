import { ExamsRepository, PatientsRepository } from '../../../repositories';
import { CreateExamUseCase } from '../../../useCases';

export function createExamUseCase() {
  const examsRepository = new ExamsRepository();
  const patientsRepository = new PatientsRepository();
  return new CreateExamUseCase(examsRepository, patientsRepository);
}
