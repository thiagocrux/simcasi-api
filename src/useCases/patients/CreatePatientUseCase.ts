import { CreatePatientSchema } from '../../schemas';
import { CreatePatientDTO, PatientsRepository } from '../../types';
import { UniqueConstraintViolationError } from '../../utils';

export class CreatePatientUseCase {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  public async execute(body: CreatePatientDTO) {
    CreatePatientSchema.parse(body);

    const patientAlreadyExists = await this.patientsRepository.find({
      cpf: body.cpf,
    });

    if (patientAlreadyExists) {
      throw new UniqueConstraintViolationError('patient');
    }

    const patient = await this.patientsRepository.create(body);
    return patient;
  }
}
