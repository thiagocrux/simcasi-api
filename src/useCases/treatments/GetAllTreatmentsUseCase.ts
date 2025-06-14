import { TreatmentsRepository } from '../../types';

export class GetAllTreatmentsUseCase {
  constructor(private readonly treatmentsRepository: TreatmentsRepository) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const treatments = await this.treatmentsRepository.findAll(order);
    return treatments;
  }
}
