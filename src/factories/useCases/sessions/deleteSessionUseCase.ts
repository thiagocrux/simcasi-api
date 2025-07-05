import { SessionsRepository } from '../../../repositories';
import { DeleteSessionUseCase } from '../../../useCases';

export function deleteSessionUseCase() {
  return new DeleteSessionUseCase(SessionsRepository);
}
