import { PatientsRepository } from '../../types';

export class GetAllPatientsUseCase {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const patients = await this.patientsRepository.findAll(order);
    return patients;
  }
}
