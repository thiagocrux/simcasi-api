import { SessionsRepository } from '../../../repositories';
import { DeleteSessionUseCase } from '../../../useCases';

export function createDeleteSessionUseCase() {
  return new DeleteSessionUseCase(SessionsRepository);
}
