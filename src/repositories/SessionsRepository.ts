import { Session } from '../models';
import { CreateSessionDTO, SessionFilter, UpdateSessionDTO } from '../types';

export class SessionsRepository {
  static async findAll(order: 'asc' | 'desc') {
    const sessions = await Session.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return sessions;
  }

  static async find(filter: SessionFilter) {
    const session = await Session.findOne(filter);
    return session;
  }

  static async create(body: CreateSessionDTO) {
    const session = await Session.create(body);
    return session._id;
  }

  static async update(filter: SessionFilter, body: UpdateSessionDTO) {
    const session = await Session.findOneAndUpdate(filter, body, {
      new: true,
    });

    return session;
  }

  static async delete(filter: SessionFilter) {
    const session = await Session.findOneAndDelete(filter);
    return session;
  }
}
