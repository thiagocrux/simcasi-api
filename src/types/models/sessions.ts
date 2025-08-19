import { Types } from 'mongoose';

import { CommonProperties } from './common';

export interface Session {
  accountId: Types.ObjectId;
  isActive: boolean;
  issuedAt: Date;
  expiresAt: Date;
  deviceInfo: {
    ipAddress: string | null;
    userAgent: string | null;
  };
}

export interface CreateSessionDTO
  extends Omit<Session, 'isActive'>,
    Partial<Pick<Session, 'isActive'>> {}

export interface UpdateSessionDTO extends Partial<Session> {}

export interface SessionFilter
  extends Partial<Session>,
    Partial<CommonProperties> {}
