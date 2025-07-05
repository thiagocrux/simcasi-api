import { Request, Response } from 'express';

import {
  createSessionUseCase,
  deleteSessionUseCase,
  generateNewAccessTokenUseCase,
  getAllSessionsUseCase,
  getSessionByIdUseCase,
} from '../factories';

export class SessionsController {
  public async index(request: Request, response: Response) {
    const sessions = await getAllSessionsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(sessions);
  }

  public async show(request: Request, response: Response) {
    const session = await getSessionByIdUseCase().execute(request.params.id);

    response.status(200).json(session);
  }

  public async create(request: Request, response: Response) {
    const { accessToken, session } = await createSessionUseCase().execute(
      request.body,
      { ipAddress: request.ip, userAgent: request.get('User-Agent') }
    );

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    response.cookie('session', session.toString(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    response.status(201).json({ accessToken, session });
  }

  public async delete(request: Request, response: Response) {
    await deleteSessionUseCase().execute(request.params.id);
    response.sendStatus(204);
  }

  public async refreshToken(request: Request, response: Response) {
    const accessToken = await generateNewAccessTokenUseCase().execute(
      request.body.session
    );

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    response.status(201).json({ accessToken });
  }
}
