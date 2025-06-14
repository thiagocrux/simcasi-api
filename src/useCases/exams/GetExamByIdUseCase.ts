import { isValidObjectId } from 'mongoose';

import { ExamsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetExamByIdUseCase {
  constructor(private readonly examsRepository: ExamsRepository) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const exam = await this.examsRepository.find({ _id: id });

    if (!exam) {
      throw new NotFoundError('exam');
    }

    return exam;
  }
}
