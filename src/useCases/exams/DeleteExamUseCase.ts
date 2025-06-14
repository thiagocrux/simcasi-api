import { isValidObjectId } from 'mongoose';

import { ExamsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class DeleteExamUseCase {
  constructor(private readonly examsRepository: ExamsRepository) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const exam = await this.examsRepository.find({ _id: id });

    if (!exam) {
      throw new NotFoundError('exam');
    }

    await this.examsRepository.delete({ _id: id });
  }
}
