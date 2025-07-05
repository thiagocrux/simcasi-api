/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Role } from '../../../src/models';
import { RolesRepository } from '../../../src/repositories/RolesRepository';

import {
  mockCreateRoleDTO,
  mockRoleDocument,
  mockUpdateRoleDTO,
} from '../../mocks/roleMocks';

vi.mock('../../../src/models', () => ({
  Role: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('RolesRepository', () => {
  let rolesRepository: RolesRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    rolesRepository = new RolesRepository();
  });

  it('should retrieve all roles in descending order', async () => {
    (Role.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockRoleDocument, _id: 'other' },
          mockRoleDocument,
        ]),
    });

    const result = await rolesRepository.findAll('desc');
    expect(Role.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockRoleDocument, _id: 'other' },
      mockRoleDocument,
    ]);
  });

  it('should retrieve all roles in ascending order', async () => {
    (Role.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockRoleDocument,
          { ...mockRoleDocument, _id: 'other' },
        ]),
    });

    const result = await rolesRepository.findAll('asc');
    expect(Role.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockRoleDocument,
      { ...mockRoleDocument, _id: 'other' },
    ]);
  });

  it('should find a role by filter', async () => {
    (Role.findOne as any).mockResolvedValueOnce(mockRoleDocument);
    const result = await rolesRepository.find({ _id: mockRoleDocument._id });
    expect(Role.findOne).toHaveBeenCalledWith({ _id: mockRoleDocument._id });
    expect(result).toEqual(mockRoleDocument);
  });

  it('should create a new role', async () => {
    (Role.create as any).mockResolvedValueOnce(mockRoleDocument);
    const result = await rolesRepository.create(mockCreateRoleDTO);
    expect(Role.create).toHaveBeenCalledWith(mockCreateRoleDTO);
    expect(result).toEqual(mockRoleDocument);
  });

  it('should update an existing role', async () => {
    (Role.findOneAndUpdate as any).mockResolvedValueOnce(mockRoleDocument);

    const result = await rolesRepository.update(
      { _id: mockRoleDocument._id },
      mockUpdateRoleDTO
    );

    expect(Role.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockRoleDocument._id },
      mockUpdateRoleDTO,
      { new: true }
    );

    expect(result).toEqual(mockRoleDocument);
  });

  it('should delete a role by filter', async () => {
    (Role.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await rolesRepository.delete({ _id: mockRoleDocument._id });

    expect(Role.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockRoleDocument._id,
    });
  });
});
