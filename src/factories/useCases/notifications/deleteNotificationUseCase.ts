import { NotificationsRepository } from '../../../repositories';
import { DeleteNotificationUseCase } from '../../../useCases';

export function deleteNotificationUseCase() {
  return new DeleteNotificationUseCase(NotificationsRepository);
}
