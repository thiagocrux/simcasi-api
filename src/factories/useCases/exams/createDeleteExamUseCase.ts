import { ExamsRepository } from '../../../repositories';
import { DeleteExamUseCase } from '../../../useCases';

export function createDeleteExamUseCase() {
  return new DeleteExamUseCase(ExamsRepository);
}
