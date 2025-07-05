import { Request, Response } from 'express';

import {
  createTreatmentUseCase,
  deleteTreatmentUseCase,
  getAllTreatmentsUseCase,
  getTreatmentByIdUseCase,
  updateTreatmentUseCase,
} from '../factories';

export class TreatmentsController {
  public async index(request: Request, response: Response) {
    const treatments = await getAllTreatmentsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(treatments);
  }

  public async show(request: Request, response: Response) {
    const treatment = await getTreatmentByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(treatment);
  }

  public async create(request: Request, response: Response) {
    const treatment = await createTreatmentUseCase().execute(request.body);
    response.status(201).json(treatment);
  }

  public async update(request: Request, response: Response) {
    const updatedTreatment = await updateTreatmentUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedTreatment);
  }

  public async delete(request: Request, response: Response) {
    await deleteTreatmentUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
