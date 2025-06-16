import { isValidObjectId } from 'mongoose';
import { UpdatePermissionSchema } from '../../schemas';
import { PermissionsRepository, UpdatePermissionDTO } from '../../types';
import { InvalidIdentifierError, NotFoundError } from '../../utils';

export class UpdatePermissionUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(id: string, { code }: UpdatePermissionDTO) {
    UpdatePermissionSchema.parse({ code });

    if (!isValidObjectId(id)) {
      throw new InvalidIdentifierError();
    }

    const permission = await this.permissionsRepository.find({ _id: id });

    if (!permission) {
      throw new NotFoundError('permission');
    }

    const updatedRole = await this.permissionsRepository.update(
      { _id: id },
      { code }
    );

    return updatedRole;
  }
}
