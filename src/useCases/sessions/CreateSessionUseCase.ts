import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  generateSessionTimeframe,
  InvalidCredentialsError,
  SessionCreationError,
} from '../../utils';

import { env, JWT_DURATION, SESSION_DURATION } from '../../config';
import { CreateSessionSchema } from '../../schemas';
import { AccountsRepository, SessionsRepository } from '../../types';

export interface CreateSessionParams {
  email: string;
  password: string;
}

export interface DeviceInfo {
  ipAddress: string | null;
  userAgent: string | null;
}

export interface CreateSessionResult {
  accessToken: string;
  session: string;
}

export class CreateSessionUseCase {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly accountsRepository: AccountsRepository
  ) {}

  async execute(
    { email, password }: CreateSessionParams,
    { ipAddress = null, userAgent = null }: DeviceInfo
  ): Promise<CreateSessionResult> {
    CreateSessionSchema.parse({
      email,
      password,
      deviceInfo: { ipAddress, userAgent },
    });

    const account = await this.accountsRepository.find({ email });
    const deviceInfo = { ipAddress, userAgent };

    if (!account) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await bcrypt.compare(password, account?.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const timeframe = generateSessionTimeframe(SESSION_DURATION);

    if (!timeframe) {
      throw new SessionCreationError();
    }

    await this.sessionsRepository.update(
      { accountId: account._id, isActive: true },
      { isActive: false }
    );

    const session = await this.sessionsRepository.create({
      accountId: account._id,
      issuedAt: timeframe.issuedAt,
      expiresAt: timeframe.expiresAt,
      deviceInfo,
    });

    const generatedAccessToken = jwt.sign(
      { sub: account._id, rid: account.role, sid: session._id },
      env.jwtSecret,
      {
        expiresIn: JWT_DURATION,
      }
    );

    return {
      accessToken: generatedAccessToken,
      session: session._id.toString(),
    };
  }
}
