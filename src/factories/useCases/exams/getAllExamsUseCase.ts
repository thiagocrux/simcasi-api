import { ExamsRepository } from '../../../repositories';
import { GetAllExamsUseCase } from '../../../useCases';

export function getAllExamsUseCase() {
  const examsRepository = new ExamsRepository();
  return new GetAllExamsUseCase(examsRepository);
}
