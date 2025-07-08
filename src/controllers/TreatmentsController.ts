import { Request, Response } from 'express';

import {
  CreateTreatmentUseCase,
  DeleteTreatmentUseCase,
  GetAllTreatmentsUseCase,
  GetTreatmentByIdUseCase,
  UpdateTreatmentUseCase,
} from '../types';

export class TreatmentsController {
  constructor(
    private readonly createTreatmentUseCase: CreateTreatmentUseCase,
    private readonly deleteTreatmentUseCase: DeleteTreatmentUseCase,
    private readonly getAllTreatmentsUseCase: GetAllTreatmentsUseCase,
    private readonly getTreatmentByIdUseCase: GetTreatmentByIdUseCase,
    private readonly updateTreatmentUseCase: UpdateTreatmentUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const treatments = await this.getAllTreatmentsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(treatments);
  }

  public async show(request: Request, response: Response) {
    const treatment = await this.getTreatmentByIdUseCase.execute(
      request.params.id
    );

    response.status(200).json(treatment);
  }

  public async create(request: Request, response: Response) {
    const treatment = await this.createTreatmentUseCase.execute(request.body);
    response.status(201).json(treatment);
  }

  public async update(request: Request, response: Response) {
    const updatedTreatment = await this.updateTreatmentUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedTreatment);
  }

  public async delete(request: Request, response: Response) {
    await this.deleteTreatmentUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
