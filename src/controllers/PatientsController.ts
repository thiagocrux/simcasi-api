import { Request, Response } from 'express';

import {
  createPatientUseCase,
  deletePatientUseCase,
  getAllPatientsUseCase,
  getPatientByIdUseCase,
  updatePatientUseCase,
} from '../factories';

export class PatientsController {
  public async index(request: Request, response: Response) {
    const patients = await getAllPatientsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(patients);
  }

  public async show(request: Request, response: Response) {
    const patient = await getPatientByIdUseCase().execute(request.params.id);

    response.status(200).json(patient);
  }

  public async create(request: Request, response: Response) {
    const patient = await createPatientUseCase().execute(request.body);
    response.status(201).json(patient);
  }

  public async update(request: Request, response: Response) {
    const updatedPatient = await updatePatientUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedPatient);
  }

  public async delete(request: Request, response: Response) {
    await deletePatientUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
