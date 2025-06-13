import {
  CreateNotificationDTO,
  NotificationFilter,
  UpdateNotificationDTO,
} from '../..';

import { NotificationDocument } from '../../../models';

export interface NotificationsRepository {
  findAll(order: 'asc' | 'desc'): Promise<NotificationDocument[]>;
  find(filter: NotificationFilter): Promise<NotificationDocument | null>;
  create(body: CreateNotificationDTO): Promise<NotificationDocument>;
  update(
    filter: NotificationFilter,
    body: UpdateNotificationDTO
  ): Promise<NotificationDocument | null>;
  delete(filter: NotificationFilter): Promise<void>;
}
