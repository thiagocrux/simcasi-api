import { Types } from 'mongoose';

import { WithObjectId, WithTimestamps, WithVersion } from './common';

export interface Notification {
  sinan: string;
  observations: string | null;
  patient: Types.ObjectId;
}

export interface CreateNotificationDTO extends Notification {}
export interface UpdateNotificationDTO extends Partial<Notification> {}

export interface NotificationFilter
  extends Partial<Notification>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}
