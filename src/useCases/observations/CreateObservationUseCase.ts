import { CreateObservationSchema } from '../../schemas';
import { NotFoundError } from '../../utils';

import {
  CreateObservationDTO,
  ObservationsRepository,
  PatientsRepository,
} from '../../types';

export class CreateObservationUseCase {
  constructor(
    private readonly observationsRepository: ObservationsRepository,
    private readonly patientsRepository: PatientsRepository
  ) {}

  public async execute(body: CreateObservationDTO) {
    CreateObservationSchema.parse(body);
    const patient = await this.patientsRepository.find({ _id: body.patient });

    if (!patient) {
      throw new NotFoundError('patient');
    }

    const observation = await this.observationsRepository.create(body);
    return observation;
  }
}
