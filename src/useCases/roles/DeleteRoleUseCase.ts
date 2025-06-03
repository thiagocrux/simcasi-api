import { isValidObjectId } from 'mongoose';

import { RolesRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class DeleteRoleUseCase {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const role = await this.rolesRepository.find({ _id: id });

    if (!role) {
      throw new NotFoundError('role');
    }

    await this.rolesRepository.delete({ _id: id });
  }
}
