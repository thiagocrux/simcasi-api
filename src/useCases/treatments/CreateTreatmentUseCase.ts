import { CreateTreatmentSchema } from '../../schemas';
import {
  CreateTreatmentDTO,
  PatientsRepository,
  TreatmentsRepository,
} from '../../types';
import { NotFoundError } from '../../utils';

export class CreateTreatmentUseCase {
  constructor(
    private readonly treatmentsRepository: TreatmentsRepository,
    private readonly patientsRepository: PatientsRepository
  ) {}

  public async execute(body: CreateTreatmentDTO) {
    CreateTreatmentSchema.parse(body);
    const patient = await this.patientsRepository.find({ _id: body.patient });

    if (!patient) {
      throw new NotFoundError('patient');
    }

    const treatment = await this.treatmentsRepository.create(body);
    return treatment;
  }
}
