import { Session } from '../models';

interface CreateSessionDTO {
  accountId: string;
  isActive?: boolean;
  issuedAt: Date;
  expiresAt: Date;
  deviceInfo: {
    ipAddress?: string;
    userAgent?: string;
  };
}

interface UpdateSessionDTO {
  accountId?: string;
  isActive?: boolean;
  issuedAt?: Date;
  expiresAt?: Date;
  deviceInfo?: {
    ipAddress?: string;
    userAgent?: string;
  };
}

export class SessionsRepository {
  static async findAll() {
    const sessions = await Session.find();
    return sessions;
  }

  static async findById(id: string) {
    const session = await Session.findById(id);
    return session;
  }

  static async create(body: CreateSessionDTO) {
    const session = await Session.create(body);
    return session._id;
  }

  static async update(id: string, body: UpdateSessionDTO) {
    const role = await Session.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    return role;
  }

  static async delete(id: string) {
    const session = await Session.findByIdAndDelete(id);
    return session;
  }

  static async findJwtVinculatedSession(id: string, accountId: string) {
    const session = await Session.findOne({ _id: id, accountId });
    return session;
  }

  static async deactivate(accountId: string) {
    const sessions = await Session.updateOne(
      { accountId, isActive: true },
      { isActive: false }
    );

    return sessions;
  }
}
