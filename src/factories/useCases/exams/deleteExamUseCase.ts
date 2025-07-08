import { ExamsRepository } from '../../../repositories';
import { DeleteExamUseCase } from '../../../useCases';

export function deleteExamUseCase() {
  const examsRepository = new ExamsRepository();
  return new DeleteExamUseCase(examsRepository);
}
