import { ExamsRepository } from '../../../repositories';
import { UpdateExamUseCase } from '../../../useCases';

export function updateExamUseCase() {
  return new UpdateExamUseCase(ExamsRepository);
}
