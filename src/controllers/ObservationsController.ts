import { Request, Response } from 'express';

import {
  createCreateObservationUseCase,
  createDeleteObservationUseCase,
  createGetAllObservationsUseCase,
  createGetObservationByIdUseCase,
  createUpdateObservationUseCase,
} from '../factories';

export class ObservationsController {
  public async index(request: Request, response: Response) {
    const observations = await createGetAllObservationsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(observations);
  }

  public async show(request: Request, response: Response) {
    const observation = await createGetObservationByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(observation);
  }

  public async create(request: Request, response: Response) {
    const observation = await createCreateObservationUseCase().execute(
      request.body
    );
    response.status(201).json(observation);
  }

  public async update(request: Request, response: Response) {
    const updatedObservation = await createUpdateObservationUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedObservation);
  }

  public async delete(request: Request, response: Response) {
    await createDeleteObservationUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
