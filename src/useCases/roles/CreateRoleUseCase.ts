import { CreateRoleSchema } from '../../schemas';
import { CreateRoleDTO, RolesRepository } from '../../types';
import { UniqueConstraintViolationError } from '../../utils';

export class CreateRoleUseCase {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute({ name }: CreateRoleDTO) {
    CreateRoleSchema.parse({ name });
    const roleAlreadyExists = await this.rolesRepository.find({ name });

    if (roleAlreadyExists) {
      throw new UniqueConstraintViolationError('role');
    }

    const role = await this.rolesRepository.create({ name });
    return role;
  }
}
