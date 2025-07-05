import { ExamsRepository } from '../../../repositories';
import { DeleteExamUseCase } from '../../../useCases';

export function deleteExamUseCase() {
  return new DeleteExamUseCase(ExamsRepository);
}
