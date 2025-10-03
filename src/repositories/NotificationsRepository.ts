import { Notification } from '../models';

import {
  CreateNotificationDTO,
  NotificationFilter,
  UpdateNotificationDTO,
} from '../types';

export class NotificationsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const notifications = await Notification.find().sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return notifications;
  }

  public async findAllByPatient(patientId: string, order: 'asc' | 'desc') {
    const notifications = await Notification.find({ patient: patientId }).sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return notifications;
  }

  public async find(filter: NotificationFilter) {
    const notification = await Notification.findOne(filter);
    return notification;
  }

  public async create(body: CreateNotificationDTO) {
    const notification = await Notification.create(body);
    return notification;
  }

  public async update(filter: NotificationFilter, body: UpdateNotificationDTO) {
    const notification = await Notification.findOneAndUpdate(filter, body, {
      new: true,
    });

    return notification;
  }

  public async delete(filter: NotificationFilter) {
    await Notification.findOneAndDelete(filter);
  }
}
