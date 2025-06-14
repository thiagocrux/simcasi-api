import { NotificationsRepository } from '../../../repositories';
import { CreateNotificationUseCase } from '../../../useCases';

export function createCreateNotificationUseCase() {
  return new CreateNotificationUseCase(NotificationsRepository);
}
