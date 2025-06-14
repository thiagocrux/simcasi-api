import { NotificationsRepository } from '../../../repositories';
import { DeleteNotificationUseCase } from '../../../useCases';

export function createDeleteNotificationUseCase() {
  return new DeleteNotificationUseCase(NotificationsRepository);
}
