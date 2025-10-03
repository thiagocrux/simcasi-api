import { ExamsRepository } from '../../types';

export class GetAllExamsByPatientUseCase {
  constructor(private readonly examsRepository: ExamsRepository) {}

  async execute(patientId: string, orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const exams = await this.examsRepository.findAllByPatient(patientId, order);
    return exams;
  }
}
