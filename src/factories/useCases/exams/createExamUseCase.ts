import { ExamsRepository, PatientsRepository } from '../../../repositories';
import { CreateExamUseCase } from '../../../useCases';

export function createExamUseCase() {
  return new CreateExamUseCase(ExamsRepository, PatientsRepository);
}
