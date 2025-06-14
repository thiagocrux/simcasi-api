import { Request, Response } from 'express';

import {
  createCreatePatientUseCase,
  createDeletePatientUseCase,
  createGetAllPatientsUseCase,
  createGetPatientByIdUseCase,
  createUpdatePatientUseCase,
} from '../factories';

export class PatientsController {
  public async index(request: Request, response: Response) {
    const patients = await createGetAllPatientsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(patients);
  }

  public async show(request: Request, response: Response) {
    const patient = await createGetPatientByIdUseCase().execute(
      request.params.id
    );

    response.status(200).json(patient);
  }

  public async create(request: Request, response: Response) {
    const patient = await createCreatePatientUseCase().execute(request.body);
    response.status(201).json(patient);
  }

  public async update(request: Request, response: Response) {
    const updatedPatient = await createUpdatePatientUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedPatient);
  }

  public async delete(request: Request, response: Response) {
    await createDeletePatientUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
