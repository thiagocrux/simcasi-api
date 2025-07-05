import { Request, Response } from 'express';

import {
  createObservationUseCase,
  deleteObservationUseCase,
  getAllObservationsUseCase,
  getObservationByIdUseCase,
  updateObservationUseCase,
} from '../factories';

export class ObservationsController {
  public async index(request: Request, response: Response) {
    const observations = await getAllObservationsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(observations);
  }

  public async show(request: Request, response: Response) {
    const observation = await getObservationByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(observation);
  }

  public async create(request: Request, response: Response) {
    const observation = await createObservationUseCase().execute(request.body);
    response.status(201).json(observation);
  }

  public async update(request: Request, response: Response) {
    const updatedObservation = await updateObservationUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedObservation);
  }

  public async delete(request: Request, response: Response) {
    await deleteObservationUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
