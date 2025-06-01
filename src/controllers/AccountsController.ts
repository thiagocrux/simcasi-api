import { Request, Response } from 'express';

import {
  createCreateAccountUseCase,
  createDeleteAccountUseCase,
  createGetAccountByIdUseCase,
  createGetAllAccountsUseCase,
  createUpdateAccountUseCase,
} from '../factories';

export class AccountsController {
  public async index(request: Request, response: Response) {
    const accounts = await createGetAllAccountsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(accounts);
  }

  public async show(request: Request, response: Response) {
    const account = await createGetAccountByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(account);
  }

  public async create(request: Request, response: Response) {
    const account = await createCreateAccountUseCase().execute(request.body);
    response.status(201).json(account);
  }

  public async update(request: Request, response: Response) {
    const updatedAccount = await createUpdateAccountUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedAccount);
  }

  public async delete(request: Request, response: Response) {
    await createDeleteAccountUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
