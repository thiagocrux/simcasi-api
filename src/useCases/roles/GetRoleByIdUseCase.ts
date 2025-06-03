import { isValidObjectId } from 'mongoose';

import { RolesRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetRoleByIdUseCase {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const role = await this.rolesRepository.find({ _id: id });

    if (!role) {
      throw new NotFoundError('role');
    }

    return role;
  }
}
