import { isValidObjectId } from 'mongoose';

import { UpdateExamSchema } from '../../schemas';
import { ExamsRepository, UpdateExamDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdateExamUseCase {
  constructor(private readonly examsRepository: ExamsRepository) {}

  async execute(id: string, body: UpdateExamDTO) {
    UpdateExamSchema.parse(body);

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const exam = await this.examsRepository.find({ _id: id });

    if (!exam) {
      throw new NotFoundError('exam');
    }

    const updatedExam = await this.examsRepository.update({ _id: id }, body);

    return updatedExam;
  }
}
