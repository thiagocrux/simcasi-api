import jwt from 'jsonwebtoken';

import { env, JWT_DURATION } from '../../config';
import { AccountsRepository, SessionsRepository } from '../../types';
import { ExpiredSessionError, NotFoundError } from '../../utils';

export class GenerateNewAccessTokenUseCase {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly accountsRepository: AccountsRepository
  ) {}

  async execute(sessionId: string) {
    const session = await this.sessionsRepository.find({ _id: sessionId });

    if (!session) {
      throw new NotFoundError('session');
    }

    const hasSessionExpired = Date.now() > session.expiresAt.getTime();

    if (hasSessionExpired || !session.isActive) {
      await this.sessionsRepository.update(
        { _id: sessionId },
        { isActive: false }
      );
      throw new ExpiredSessionError();
    }

    const account = await this.accountsRepository.find({
      _id: session.accountId,
    });

    if (!account) {
      throw new NotFoundError('account');
    }

    const accessToken = await jwt.sign(
      { sub: account._id, rid: account.role, sid: session._id },
      env.jwtSecret,
      {
        expiresIn: JWT_DURATION,
      }
    );

    return accessToken;
  }
}
