import { ExamsRepository } from '../../../repositories';
import { GetAllExamsByPatientUseCase } from '../../../useCases';

export function getAllExamsByPatientUseCase() {
  const examsRepository = new ExamsRepository();
  return new GetAllExamsByPatientUseCase(examsRepository);
}
