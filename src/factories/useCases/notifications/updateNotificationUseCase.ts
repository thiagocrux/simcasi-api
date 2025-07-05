import { NotificationsRepository } from '../../../repositories';
import { UpdateNotificationUseCase } from '../../../useCases';

export function updateNotificationUseCase() {
  return new UpdateNotificationUseCase(NotificationsRepository);
}
