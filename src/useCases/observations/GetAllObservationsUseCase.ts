import { ObservationsRepository } from '../../types';

export class GetAllObservationsUseCase {
  constructor(
    private readonly observationsRepository: ObservationsRepository
  ) {}

  async execute(orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';
    const observations = await this.observationsRepository.findAll(order);
    return observations;
  }
}
