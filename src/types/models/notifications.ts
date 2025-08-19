import { Types } from 'mongoose';

import { CommonProperties } from './common';

export interface Notification {
  sinan: string;
  observations: string | null;
  patient: Types.ObjectId | string;
}

export interface CreateNotificationDTO extends Notification {}
export interface UpdateNotificationDTO extends Partial<Notification> {}

export interface NotificationFilter
  extends Partial<Notification>,
    Partial<CommonProperties> {}
