import { isValidObjectId } from 'mongoose';

import { SessionsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class DeleteSessionUseCase {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const session = await this.sessionsRepository.find({ _id: id });

    if (!session) {
      throw new NotFoundError('session');
    }

    await this.sessionsRepository.delete({ _id: id });
  }
}
