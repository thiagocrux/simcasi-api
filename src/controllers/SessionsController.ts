import { Request, Response } from 'express';

import {
  createCreateSessionUseCase,
  createDeleteSessionUseCase,
  createGenerateNewAccessTokenUseCase,
  createGetAllSessionsUseCase,
  createGetSessionByIdUseCase,
} from '../factories';

export class SessionsController {
  public async index(request: Request, response: Response) {
    const sessions = await createGetAllSessionsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(sessions);
  }

  public async show(request: Request, response: Response) {
    const session = await createGetSessionByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(session);
  }

  public async create(request: Request, response: Response) {
    const { accessToken, session } = await createCreateSessionUseCase().execute(
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
    await createDeleteSessionUseCase().execute(request.params.id);
    response.sendStatus(204);
  }

  public async refreshToken(request: Request, response: Response) {
    const accessToken = await createGenerateNewAccessTokenUseCase().execute(
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
