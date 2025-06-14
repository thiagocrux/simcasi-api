import { ExamsRepository } from '../../types';

export class GetAllExamsUseCase {
  constructor(private readonly examsRepository: ExamsRepository) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const exams = await this.examsRepository.findAll(order);
    return exams;
  }
}
