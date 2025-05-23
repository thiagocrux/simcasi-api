import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { AccountsRepository } from '../repositories/AccountsRepository';

import {
  InvalidIdentifierError,
  NotFoundError,
  UniqueConstraintViolationError,
  UniqueEmailViolationError,
} from '../utils';

export class AccountsController {
  static async index(request: Request, response: Response) {
    const accounts = await AccountsRepository.findAll();
    response.status(200).json(accounts);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const account = await AccountsRepository.findById(id);

    if (!account) {
      throw new NotFoundError('account');
    }

    response.status(200).json(account);
  }

  static async create(request: Request, response: Response) {
    const { name, email, password, role } = request.body;
    const accountAlreadyExists = await AccountsRepository.findByEmail(email);

    if (accountAlreadyExists) {
      throw new UniqueConstraintViolationError('account');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const account = await AccountsRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    response.status(201).json(account);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, password, role } = request.body;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const account = await AccountsRepository.findById(id);

    if (!account) {
      throw new NotFoundError('account');
    }

    if (account?.email !== email) {
      const isEmailTaken = await AccountsRepository.findByEmail(email);

      if (isEmailTaken) {
        throw new UniqueEmailViolationError();
      }
    }

    const updatedAccount = await AccountsRepository.update(id, {
      name,
      email,
      password,
      role,
    });

    response.status(200).json(updatedAccount);
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const account = await AccountsRepository.findById(id);

    if (!account) {
      throw new NotFoundError('account');
    }

    await AccountsRepository.delete(id);
    response.sendStatus(204);
  }
}
