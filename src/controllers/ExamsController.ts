import { Request, Response } from 'express';

import {
  createExamUseCase,
  deleteExamUseCase,
  getAllExamsUseCase,
  getExamByIdUseCase,
  updateExamUseCase,
} from '../factories';

export class ExamsController {
  public async index(request: Request, response: Response) {
    const exams = await getAllExamsUseCase().execute(
      request.query?.order as string
    );

    response.status(200).json(exams);
  }

  public async show(request: Request, response: Response) {
    const exam = await getExamByIdUseCase().execute(request.params.id);

    response.status(200).json(exam);
  }

  public async create(request: Request, response: Response) {
    const exam = await createExamUseCase().execute(request.body);
    response.status(201).json(exam);
  }

  public async update(request: Request, response: Response) {
    const updatedExam = await updateExamUseCase().execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedExam);
  }

  public async delete(request: Request, response: Response) {
    await deleteExamUseCase().execute(request.params.id);
    response.sendStatus(204);
  }
}
