/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Permission } from '../../../src/models';
import { PermissionsRepository } from '../../../src/repositories/PermissionsRepository';

import {
  mockCreatePermissionDTO,
  mockPermissionDocument,
  mockUpdatePermissionDTO,
} from '../../mocks/permissionMocks';

vi.mock('../../../src/models', () => ({
  Permission: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('PermissionsRepository', () => {
  let permissionsRepository: PermissionsRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    permissionsRepository = new PermissionsRepository();
  });

  it('should retrieve all permissions in descending order', async () => {
    (Permission.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockPermissionDocument, _id: 'other' },
          mockPermissionDocument,
        ]),
    });

    const result = await permissionsRepository.findAll('desc');
    expect(Permission.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockPermissionDocument, _id: 'other' },
      mockPermissionDocument,
    ]);
  });

  it('should retrieve all permissions in ascending order', async () => {
    (Permission.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockPermissionDocument,
          { ...mockPermissionDocument, _id: 'other' },
        ]),
    });

    const result = await permissionsRepository.findAll('asc');
    expect(Permission.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockPermissionDocument,
      { ...mockPermissionDocument, _id: 'other' },
    ]);
  });

  it('should find a permission by filter', async () => {
    (Permission.findOne as any).mockResolvedValueOnce(mockPermissionDocument);

    const result = await permissionsRepository.find({
      _id: mockPermissionDocument._id,
    });

    expect(Permission.findOne).toHaveBeenCalledWith({
      _id: mockPermissionDocument._id,
    });

    expect(result).toEqual(mockPermissionDocument);
  });

  it('should create a new permission', async () => {
    (Permission.create as any).mockResolvedValueOnce(mockPermissionDocument);
    const result = await permissionsRepository.create(mockCreatePermissionDTO);
    expect(Permission.create).toHaveBeenCalledWith(mockCreatePermissionDTO);
    expect(result).toEqual(mockPermissionDocument);
  });

  it('should update an existing permission', async () => {
    (Permission.findOneAndUpdate as any).mockResolvedValueOnce(
      mockPermissionDocument
    );

    const result = await permissionsRepository.update(
      { _id: mockPermissionDocument._id },
      mockUpdatePermissionDTO
    );

    expect(Permission.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockPermissionDocument._id },
      mockUpdatePermissionDTO,
      { new: true }
    );

    expect(result).toEqual(mockPermissionDocument);
  });

  it('should delete a permission by filter', async () => {
    (Permission.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await permissionsRepository.delete({ _id: mockPermissionDocument._id });

    expect(Permission.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockPermissionDocument._id,
    });
  });
});
