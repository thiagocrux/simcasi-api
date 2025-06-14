import { NotificationsRepository } from '../../../repositories';
import { GetNotificationByIdUseCase } from '../../../useCases';

export function createGetNotificationByIdUseCase() {
  return new GetNotificationByIdUseCase(NotificationsRepository);
}
