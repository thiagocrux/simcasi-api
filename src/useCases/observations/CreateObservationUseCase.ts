import { CreateObservationSchema } from '../../schemas';
import { CreateObservationDTO, ObservationsRepository } from '../../types';

export class CreateObservationUseCase {
  constructor(
    private readonly observationsRepository: ObservationsRepository
  ) {}

  public async execute(body: CreateObservationDTO) {
    CreateObservationSchema.parse(body);
    const observation = await this.observationsRepository.create(body);
    return observation;
  }
}
