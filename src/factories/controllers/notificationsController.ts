import { NotificationsController } from '../../controllers';

import {
  createNotificationUseCase,
  deleteNotificationUseCase,
  getAllNotificationsUseCase,
  getNotificationByIdUseCase,
  updateNotificationUseCase,
} from '..';

export function notificationsController() {
  return new NotificationsController(
    createNotificationUseCase(),
    deleteNotificationUseCase(),
    getAllNotificationsUseCase(),
    getNotificationByIdUseCase(),
    updateNotificationUseCase()
  );
}
