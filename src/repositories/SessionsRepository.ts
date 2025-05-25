import { Session } from '../models';
import { CreateSessionDTO, SessionFilter, UpdateSessionDTO } from '../types';

export class SessionsRepository {
  static async findAll(order: 'asc' | 'desc') {
    const sessions = await Session.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return sessions;
  }

  static async findById(id: string) {
    const session = await Session.findById(id);
    return session;
  }

  static async find(filter: SessionFilter) {
    const session = await Session.findOne(filter);
    return session;
  }

  static async create(body: CreateSessionDTO) {
    const session = await Session.create(body);
    return session._id;
  }

  static async updateById(id: string, body: UpdateSessionDTO) {
    const session = await Session.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    return session;
  }

  static async update(filter: SessionFilter, body: UpdateSessionDTO) {
    const session = await Session.findOneAndUpdate(filter, body, {
      new: true,
    });

    return session;
  }

  static async deleteById(id: string) {
    const session = await Session.findByIdAndDelete(id);
    return session;
  }
}
