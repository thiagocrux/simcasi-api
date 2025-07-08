import { ExamsRepository } from '../../../repositories';
import { UpdateExamUseCase } from '../../../useCases';

export function updateExamUseCase() {
  const examsRepository = new ExamsRepository();
  return new UpdateExamUseCase(examsRepository);
}
