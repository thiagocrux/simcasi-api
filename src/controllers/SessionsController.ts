import { Request, Response } from 'express';

import {
  CreateSessionUseCase,
  DeleteSessionUseCase,
  GenerateNewAccessTokenUseCase,
  GetAllSessionsUseCase,
  GetSessionByIdUseCase,
} from '../types';

export class SessionsController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly deleteSessionUseCase: DeleteSessionUseCase,
    private readonly generateNewAccessTokenUseCase: GenerateNewAccessTokenUseCase,
    private readonly getAllSessionsUseCase: GetAllSessionsUseCase,
    private readonly getSessionByIdUseCase: GetSessionByIdUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const sessions = await this.getAllSessionsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(sessions);
  }

  public async show(request: Request, response: Response) {
    const session = await this.getSessionByIdUseCase.execute(request.params.id);

    response.status(200).json(session);
  }

  public async create(request: Request, response: Response) {
    const { accessToken, session } = await this.createSessionUseCase.execute(
      request.body,
      {
        ipAddress: request.ip || null,
        userAgent: request.get('User-Agent') || null,
      }
    );

    response.status(201).json({ accessToken, session });
  }

  public async delete(request: Request, response: Response) {
    await this.deleteSessionUseCase.execute(request.params.id);
    response.sendStatus(204);
  }

  public async refreshToken(request: Request, response: Response) {
    const accessToken = await this.generateNewAccessTokenUseCase.execute(
      request.body.session
    );

    response.status(201).json({ accessToken });
  }
}
