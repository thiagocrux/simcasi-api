import { Request, Response } from 'express';

import {
  CreateObservationUseCase,
  DeleteObservationUseCase,
  GetAllObservationsUseCase,
  GetObservationByIdUseCase,
  UpdateObservationUseCase,
} from '../types';

export class ObservationsController {
  constructor(
    private readonly createObservationUseCase: CreateObservationUseCase,
    private readonly deleteObservationUseCase: DeleteObservationUseCase,
    private readonly getAllObservationsUseCase: GetAllObservationsUseCase,
    private readonly getObservationByIdUseCase: GetObservationByIdUseCase,
    private readonly updateObservationUseCase: UpdateObservationUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const observations = await this.getAllObservationsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(observations);
  }

  public async show(request: Request, response: Response) {
    const observation = await this.getObservationByIdUseCase.execute(
      request.params.id
    );

    response.status(200).json(observation);
  }

  public async create(request: Request, response: Response) {
    const observation = await this.createObservationUseCase.execute(
      request.body
    );

    response.status(201).json(observation);
  }

  public async update(request: Request, response: Response) {
    const updatedObservation = await this.updateObservationUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedObservation);
  }

  public async delete(request: Request, response: Response) {
    await this.deleteObservationUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
