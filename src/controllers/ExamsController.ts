import { Request, Response } from 'express';

import {
  createCreateExamUseCase,
  createDeleteExamUseCase,
  createGetAllExamsUseCase,
  createGetExamByIdUseCase,
  createUpdateExamUseCase,
} from '../factories';

export class ExamsController {
  public async index(request: Request, response: Response) {
    const exams = await createGetAllExamsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(exams);
  }

  public async show(request: Request, response: Response) {
    const exam = await createGetExamByIdUseCase().execute(request.params.id);

    response.status(200).json(exam);
  }

  public async create(request: Request, response: Response) {
    const exam = await createCreateExamUseCase().execute(request.body);
    response.status(201).json(exam);
  }

  public async update(request: Request, response: Response) {
    const updatedExam = await createUpdateExamUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedExam);
  }

  public async delete(request: Request, response: Response) {
    await createDeleteExamUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
