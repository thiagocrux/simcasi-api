export interface Session {
  _id: string;
  accountId: string;
  isActive: boolean;
  issuedAt: Date;
  expiresAt: Date;
  deviceInfo: {
    ipAddress?: string;
    userAgent?: string;
  };
}

export interface CreateSessionDTO {
  accountId: string;
  isActive?: boolean;
  issuedAt: Date;
  expiresAt: Date;
  deviceInfo: {
    ipAddress?: string;
    userAgent?: string;
  };
}

export interface UpdateSessionDTO {
  accountId?: string;
  isActive?: boolean;
  issuedAt?: Date;
  expiresAt?: Date;
  deviceInfo?: {
    ipAddress?: string;
    userAgent?: string;
  };
}

export interface SessionFilter extends UpdateSessionDTO {
  _id?: string;
}
