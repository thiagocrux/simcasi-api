import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

import { ENVS, JWT_EXPIRATION_TIME, SESSION_LIMIT_IN_DAYS } from '../config';
import { Session } from '../models';
import { AccountsRepository, SessionsRepository } from '../repositories';

import {
  InvalidCredentialsError,
  InvalidIdentifierError,
  NotFoundError,
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

    if (!account) {
      console.log(account);
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await bcrypt.compare(password, account?.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = jwt.sign({ sub: account._id }, ENVS.jwtSecret, {
      expiresIn: JWT_EXPIRATION_TIME,
    });

    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime());
    expiresAt.setDate(expiresAt.getDate() + SESSION_LIMIT_IN_DAYS);

    const session = await Session.create({
      accountId: account._id,
      issuedAt,
      expiresAt,
      deviceInfo: {
        ipAddress: request.ip,
        userAgent: request.get('User-Agent'),
      },
    });

    response.status(201).json({ accessToken, refreshToken: session._id });
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
}
