import { Request, Response } from 'express';

import {
  CreateAccountUseCase,
  DeleteAccountUseCase,
  GetAccountByIdUseCase,
  GetAllAccountsUseCase,
  UpdateAccountUseCase,
} from '../types';

export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly deleteAccountUseCase: DeleteAccountUseCase,
    private readonly getAccountByIdUseCase: GetAccountByIdUseCase,
    private readonly getAllAccountsUseCase: GetAllAccountsUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const accounts = await this.getAllAccountsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(accounts);
  }

  public async show(request: Request, response: Response) {
    const account = await this.getAccountByIdUseCase.execute(request.params.id);

    response.status(200).json(account);
  }

  public async create(request: Request, response: Response) {
    const account = await this.createAccountUseCase.execute(request.body);
    response.status(201).json(account);
  }

  public async update(request: Request, response: Response) {
    const updatedAccount = await this.updateAccountUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedAccount);
  }

  public async delete(request: Request, response: Response) {
    await this.deleteAccountUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
