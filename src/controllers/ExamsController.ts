import { Request, Response } from 'express';

import { GetAllExamsByPatientUseCase } from '../useCases';

import {
  CreateExamUseCase,
  DeleteExamUseCase,
  GetAllExamsUseCase,
  GetExamByIdUseCase,
  UpdateExamUseCase,
} from '../types';

export class ExamsController {
  constructor(
    private readonly getAllExamsUseCase: GetAllExamsUseCase,
    private readonly getAllExamsByPatientUseCase: GetAllExamsByPatientUseCase,
    private readonly getExamByIdUseCase: GetExamByIdUseCase,
    private readonly createExamUseCase: CreateExamUseCase,
    private readonly updateExamUseCase: UpdateExamUseCase,
    private readonly deleteExamUseCase: DeleteExamUseCase
  ) {}

  public async index(request: Request, response: Response) {
    const exams = await this.getAllExamsUseCase.execute(
      request.query?.order as string
    );

    response.status(200).json(exams);
  }

  public async indexByPatient(request: Request, response: Response) {
    const exams = await this.getAllExamsByPatientUseCase.execute(
      request.params?.patientId as string,
      request.query?.order as string
    );

    response.status(200).json(exams);
  }

  public async show(request: Request, response: Response) {
    const exam = await this.getExamByIdUseCase.execute(request.params.id);
    response.status(200).json(exam);
  }

  public async create(request: Request, response: Response) {
    const exam = await this.createExamUseCase.execute(request.body);
    response.status(201).json(exam);
  }

  public async update(request: Request, response: Response) {
    const updatedExam = await this.updateExamUseCase.execute(
      request.params.id,
      request.body
    );

    response.status(200).json(updatedExam);
  }

  public async delete(request: Request, response: Response) {
    await this.deleteExamUseCase.execute(request.params.id);
    response.sendStatus(204);
  }
}
