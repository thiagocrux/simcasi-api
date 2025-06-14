import { CreateExamDTO, ExamsRepository } from '../../types';

export class CreateExamUseCase {
  constructor(private readonly examsRepository: ExamsRepository) {}

  public async execute(body: CreateExamDTO) {
    const exam = await this.examsRepository.create(body);
    return exam;
  }
}
