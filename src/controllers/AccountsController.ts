import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { AccountsRepository } from '../repositories/AccountsRepository';

import { ValidationError } from '../utils';

export class AccountsController {
  static async index(request: Request, response: Response) {
    const accounts = await AccountsRepository.findAll();
    response.status(200).json(accounts);
  }

  static async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      ValidationError.invalidIdFormat((error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const account = await AccountsRepository.findById(id);

    if (!account) {
      ValidationError.notFound('account', (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    response.status(200).json(account);
  }

  static async create(request: Request, response: Response) {
    const { name, email, password, role } = request.body;
    const accountAlreadyExists = await AccountsRepository.findByEmail(email);

    if (accountAlreadyExists) {
      ValidationError.duplicatedSubject('account', (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const account = await AccountsRepository.create({
      name,
      email,
      password,
      role,
    });

    response.status(201).json(account);
  }

  static async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, password, role } = request.body;

    if (!isValidObjectId(id)) {
      ValidationError.invalidIdFormat((error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const account = await AccountsRepository.findById(id);

    if (!account) {
      ValidationError.notFound('account', (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    if (account?.email !== email) {
      const isEmailTaken = await AccountsRepository.findByEmail(email);

      if (isEmailTaken) {
        ValidationError.duplicatedEmail((error) =>
          response.status(error.status).json({ error: error.message })
        );

        return;
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
      ValidationError.invalidIdFormat((error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    const account = await AccountsRepository.findById(id);

    if (!account) {
      ValidationError.notFound('account', (error) =>
        response.status(error.status).json({ error: error.message })
      );

      return;
    }

    await AccountsRepository.delete(id);
    response.sendStatus(204);
  }
}
