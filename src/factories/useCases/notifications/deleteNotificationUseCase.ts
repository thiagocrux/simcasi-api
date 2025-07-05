import { NotificationsRepository } from '../../../repositories';
import { DeleteNotificationUseCase } from '../../../useCases';

export function deleteNotificationUseCase() {
  const notificationsRepository = new NotificationsRepository();
  return new DeleteNotificationUseCase(notificationsRepository);
}
