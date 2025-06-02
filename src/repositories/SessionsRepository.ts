import { Session } from '../models';
import { CreateSessionDTO, SessionFilter, UpdateSessionDTO } from '../types';

class SessionsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const sessions = await Session.find().sort({
      updatedAt: order === 'asc' ? 1 : -1,
    });

    return sessions;
  }

  public async find(filter: SessionFilter) {
    const session = await Session.findOne(filter);
    return session;
  }

  public async create(body: CreateSessionDTO) {
    const session = await Session.create(body);
    return session;
  }

  public async update(filter: SessionFilter, body: UpdateSessionDTO) {
    const session = await Session.findOneAndUpdate(filter, body, {
      new: true,
    });

    return session;
  }

  public async delete(filter: SessionFilter) {
    await Session.findOneAndDelete(filter);
  }
}

export default new SessionsRepository();
