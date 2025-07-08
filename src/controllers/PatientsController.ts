import { Request, Response } from 'express';

import {
  CreatePatientUseCase,
  DeletePatientUseCase,
  GetAllPatientsUseCase,
  GetPatientByIdUseCase,
  UpdatePatientUseCase,
} from '../types';

export class PatientsController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly deletePatientUseCase: DeletePatientUseCase,
    private readonly getAllPatientsUseCase: GetAllPatientsUseCase,
    private readonly getPatientByIdUseCase: GetPatientByIdUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const patients = await this.getAllPatientsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(patients);
  }

  public async show(request: Request, response: Response) {
    const patient = await this.getPatientByIdUseCase.execute(request.params.id);
    response.status(200).json(patient);
  }

  public async create(request: Request, response: Response) {
    const patient = await this.createPatientUseCase.execute(request.body);
    response.status(201).json(patient);
  }

  public async update(request: Request, response: Response) {
    const updatedPatient = await this.updatePatientUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedPatient);
  }

  public async delete(request: Request, response: Response) {
    await this.deletePatientUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
