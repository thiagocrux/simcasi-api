import { Request, Response } from 'express';

import {
  createAccountUseCase,
  deleteAccountUseCase,
  getAccountByIdUseCase,
  getAllAccountsUseCase,
  updateAccountUseCase,
} from '../factories';

export class AccountsController {
  public async index(request: Request, response: Response) {
    const accounts = await getAllAccountsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(accounts);
  }

  public async show(request: Request, response: Response) {
    const account = await getAccountByIdUseCase().execute(request.params.id);

    response.status(200).json(account);
  }

  public async create(request: Request, response: Response) {
    const account = await createAccountUseCase().execute(request.body);
    response.status(201).json(account);
  }

  public async update(request: Request, response: Response) {
    const updatedAccount = await updateAccountUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedAccount);
  }

  public async delete(request: Request, response: Response) {
    await deleteAccountUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
