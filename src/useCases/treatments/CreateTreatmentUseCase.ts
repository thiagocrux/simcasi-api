import { CreateTreatmentDTO, TreatmentsRepository } from '../../types';

export class CreateTreatmentUseCase {
  constructor(private readonly treatmentsRepository: TreatmentsRepository) {}

  public async execute(body: CreateTreatmentDTO) {
    const treatment = await this.treatmentsRepository.create(body);
    return treatment;
  }
}
