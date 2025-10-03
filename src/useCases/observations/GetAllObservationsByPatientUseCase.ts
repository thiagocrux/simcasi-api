import { ObservationsRepository } from '../../types';

export class GetAllObservationsByPatientUseCase {
  constructor(
    private readonly observationsRepository: ObservationsRepository
  ) {}

  async execute(patientId: string, orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';

    const observations = await this.observationsRepository.findAllByPatient(
      patientId,
      order
    );

    return observations;
  }
}
