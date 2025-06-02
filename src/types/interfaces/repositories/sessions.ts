import { CreateSessionDTO, SessionFilter, UpdateSessionDTO } from '../..';
import { SessionDocument } from '../../../models';

export interface SessionsRepository {
  findAll(order: 'asc' | 'desc'): Promise<SessionDocument[]>;
  find(filter: SessionFilter): Promise<SessionDocument | null>;
  create(body: CreateSessionDTO): Promise<SessionDocument>;
  update(
    filter: SessionFilter,
    body: UpdateSessionDTO
  ): Promise<SessionDocument | null>;
  delete(filter: SessionFilter): Promise<void>;
}
