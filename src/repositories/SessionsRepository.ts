import { Session } from '../models';

interface CreateSessionDTO {
  accountId: string;
  issuedAt: Date;
  expiresAt: Date;
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

  static async delete(id: string) {
    const session = await Session.findByIdAndDelete(id);
    return session;
  }
}
