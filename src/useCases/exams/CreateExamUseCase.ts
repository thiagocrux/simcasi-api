import { CreateExamSchema } from '../../schemas';
import { NotFoundError } from '../../utils';

import {
  CreateExamDTO,
  ExamsRepository,
  PatientsRepository,
} from '../../types';

export class CreateExamUseCase {
  constructor(
    private readonly examsRepository: ExamsRepository,
    private readonly patientsRepository: PatientsRepository
  ) {}

  public async execute(body: CreateExamDTO) {
    CreateExamSchema.parse(body);
    const patient = await this.patientsRepository.find({ _id: body.patient });

    if (!patient) {
      throw new NotFoundError('patient');
    }

    const exam = await this.examsRepository.create(body);
    return exam;
  }
}
