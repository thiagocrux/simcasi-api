import { SessionsRepository } from '../../../repositories';
import { DeleteSessionUseCase } from '../../../useCases';

export function deleteSessionUseCase() {
  const sessionsRepository = new SessionsRepository();
  return new DeleteSessionUseCase(sessionsRepository);
}
