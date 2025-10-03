import { NotificationsController } from '../../controllers';

import {
  createNotificationUseCase,
  deleteNotificationUseCase,
  getAllNotificationsByPatientUseCase,
  getAllNotificationsUseCase,
  getNotificationByIdUseCase,
  updateNotificationUseCase,
} from '..';

export function notificationsController() {
  return new NotificationsController(
    createNotificationUseCase(),
    deleteNotificationUseCase(),
    getAllNotificationsUseCase(),
    getAllNotificationsByPatientUseCase(),
    getNotificationByIdUseCase(),
    updateNotificationUseCase()
  );
}
