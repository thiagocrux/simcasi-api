import { Types } from 'mongoose';
import { WithObjectId, WithTimestamps, WithVersion } from './common';

export interface Session {
  accountId: Types.ObjectId;
  isActive: boolean;
  issuedAt: Date;
  expiresAt: Date;
  deviceInfo: {
    ipAddress?: string;
    userAgent?: string;
  };
}

export interface CreateSessionDTO
  extends Omit<Session, 'isActive'>,
    Partial<Pick<Session, 'isActive'>> {}

export interface UpdateSessionDTO extends Partial<Session> {}

export interface SessionFilter
  extends Partial<Session>,
    Partial<WithObjectId>,
    Partial<WithVersion>,
    Partial<WithTimestamps> {}
