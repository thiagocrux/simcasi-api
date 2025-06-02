import { SessionsRepository } from '../../types';

export class GetAllSessionsUseCase {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const sessions = await this.sessionsRepository.findAll(order);
    return sessions;
  }
}
