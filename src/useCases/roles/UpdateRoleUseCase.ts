import { isValidObjectId } from 'mongoose';
import { RolesRepository, UpdateRoleDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdateRoleUseCase {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute(id: string, { name }: UpdateRoleDTO) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const role = await this.rolesRepository.find({ _id: id });

    if (!role) {
      throw new NotFoundError('role');
    }

    const updatedRole = await this.rolesRepository.update(
      { _id: id },
      { name }
    );

    return updatedRole;
  }
}
