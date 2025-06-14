import { Request, Response } from 'express';

import {
  createCreateTreatmentUseCase,
  createDeleteTreatmentUseCase,
  createGetAllTreatmentsUseCase,
  createGetTreatmentByIdUseCase,
  createUpdateTreatmentUseCase,
} from '../factories';

export class TreatmentsController {
  public async index(request: Request, response: Response) {
    const treatments = await createGetAllTreatmentsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(treatments);
  }

  public async show(request: Request, response: Response) {
    const treatment = await createGetTreatmentByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(treatment);
  }

  public async create(request: Request, response: Response) {
    const treatment = await createCreateTreatmentUseCase().execute(
      request.body
    );
    response.status(201).json(treatment);
  }

  public async update(request: Request, response: Response) {
    const updatedTreatment = await createUpdateTreatmentUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedTreatment);
  }

  public async delete(request: Request, response: Response) {
    await createDeleteTreatmentUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
