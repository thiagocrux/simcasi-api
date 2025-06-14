import { CreateObservationDTO, ObservationsRepository } from '../../types';

export class CreateObservationUseCase {
  constructor(
    private readonly observationsRepository: ObservationsRepository
  ) {}

  public async execute(body: CreateObservationDTO) {
    const observation = await this.observationsRepository.create(body);
    return observation;
  }
}
