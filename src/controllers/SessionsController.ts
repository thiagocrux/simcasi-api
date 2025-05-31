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
    const order = request.query.order === 'desc' ? 'desc' : 'asc';
    const sessions = await SessionsRepository.findAll(order);
    response.status(200).json(sessions);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const session = await SessionsRepository.find({ _id: id });

    if (!session) {
      throw new NotFoundError('session');
    }

    response.status(200).json(session);
  }

  static async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const account = await AccountsRepository.find({ email });

    const deviceInfo = {
      ipAddress: request.ip,
      userAgent: request.get('User-Agent'),
    };

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

    await SessionsRepository.update(
      { accountId: account._id, isActive: true },
      { isActive: false }
    );

    const session = await SessionsRepository.create({
      accountId: account._id,
      issuedAt: timeframe.issuedAt,
      expiresAt: timeframe.expiresAt,
      deviceInfo,
    });

    const accessToken = jwt.sign(
      { sub: account._id, rid: account.role, sid: session._id },
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

    const session = await SessionsRepository.find({ _id: id });

    if (!session) {
      throw new NotFoundError('session');
    }

    await SessionsRepository.delete({ _id: id });
    response.sendStatus(204);
  }

  static async refreshToken(request: Request, response: Response) {
    const { session: sessionId } = request.body;
    const session = await SessionsRepository.find({ _id: sessionId });

    if (!session) {
      throw new NotFoundError('session');
    }

    const hasSessionExpired = Date.now() > session.expiresAt.getTime();

    if (hasSessionExpired || !session.isActive) {
      await SessionsRepository.update({ _id: sessionId }, { isActive: false });
      throw new ExpiredSessionError();
    }

    const account = await AccountsRepository.find({ _id: session.accountId });

    if (!account) {
      throw new NotFoundError('account');
    }

    const accessToken = await jwt.sign(
      { sub: account._id, rid: account.role, sid: session._id },
      ENVS.jwtSecret,
      {
        expiresIn: JWT_DURATION,
      }
    );

    response.status(201).json({ accessToken });
  }
}
