import { TreatmentsRepository } from '../../types';

export class GetAllTreatmentsByPatientUseCase {
  constructor(private readonly treatmentsRepository: TreatmentsRepository) {}

  async execute(patientId: string, orderBy: string) {
    const order = orderBy === 'desc' ? 'desc' : 'asc';

    const treatments = await this.treatmentsRepository.findAllByPatient(
      patientId,
      order
    );

    return treatments;
  }
}
