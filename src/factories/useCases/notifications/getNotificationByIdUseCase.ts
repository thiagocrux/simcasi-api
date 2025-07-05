import { NotificationsRepository } from '../../../repositories';
import { GetNotificationByIdUseCase } from '../../../useCases';

export function getNotificationByIdUseCase() {
  return new GetNotificationByIdUseCase(NotificationsRepository);
}
