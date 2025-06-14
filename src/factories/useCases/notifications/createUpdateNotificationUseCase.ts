import { NotificationsRepository } from '../../../repositories';
import { UpdateNotificationUseCase } from '../../../useCases';

export function createUpdateNotificationUseCase() {
  return new UpdateNotificationUseCase(NotificationsRepository);
}
