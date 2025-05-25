import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

import { ENVS, JWT_DURATION, SESSION_DURATION } from '../config';
import { AccountsRepository, SessionsRepository } from '../repositories';

import {
  ExpiredSessionError,
  generateSessionTimeframe,
  InvalidCredentialsError,
  InvalidIdentifierError,
  NotFoundError,
  SessionCreationError,
} from '../utils';

export class SessionsController {
  static async index(request: Request, response: Response) {
    const sessions = await SessionsRepository.findAll();
    response.status(200).json(sessions);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const session = await SessionsRepository.findById(id);

    if (!session) {
      throw new NotFoundError('session');
    }

    response.status(200).json(session);
  }

  static async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const account = await AccountsRepository.findByEmail(email);

    const deviceInfo = {
      ipAddress: request.ip,
      userAgent: request.get('User-Agent'),
    };

    if (!account) {
      console.log(account);
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

    await SessionsRepository.deactivate(String(account._id));

    const session = await SessionsRepository.create({
      accountId: String(account._id),
      issuedAt: timeframe.issuedAt,
      expiresAt: timeframe.expiresAt,
      deviceInfo,
    });

    const accessToken = jwt.sign(
      { sub: account._id, sid: session._id },
      ENVS.jwtSecret,
      {
        expiresIn: JWT_DURATION,
      }
    );

    response.status(201).json({ accessToken, session: session._id });
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const session = await SessionsRepository.findById(id);

    if (!session) {
      throw new NotFoundError('session');
    }

    await SessionsRepository.delete(id);
    response.sendStatus(204);
  }

  static async refreshToken(request: Request, response: Response) {
    const { session: sessionId } = request.body;
    const session = await SessionsRepository.findById(sessionId);

    if (!session) {
      throw new NotFoundError('session');
    }

    const hasSessionExpired = Date.now() > session.expiresAt.getTime();

    if (hasSessionExpired || !session.isActive) {
      await SessionsRepository.update(sessionId, { isActive: false });
      throw new ExpiredSessionError();
    }

    const accessToken = await jwt.sign(
      { sub: session.accountId, sid: session._id },
      ENVS.jwtSecret,
      {
        expiresIn: JWT_DURATION,
      }
    );

    response.status(201).json({ accessToken });
  }
}
