import { isValidObjectId } from 'mongoose';
import { PermissionsRepository } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class GetPermissionByIdUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(id: string) {
    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const permission = await this.permissionsRepository.find({ _id: id });

    if (!permission) {
      throw new NotFoundError('permission');
    }

    return permission;
  }
}
