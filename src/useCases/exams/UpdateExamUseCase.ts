import { isValidObjectId } from 'mongoose';

import { ExamsRepository, UpdateExamDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdateExamUseCase {
  constructor(private readonly examsRepository: ExamsRepository) {}

  async execute(id: string, body: UpdateExamDTO) {
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
