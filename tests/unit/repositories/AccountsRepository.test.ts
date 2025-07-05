/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Account } from '../../../src/models';
import { AccountsRepository } from '../../../src/repositories/AccountsRepository';

import {
  mockAccountDocument,
  mockCreateAccountDTO,
  mockUpdateAccountDTO,
} from '../../mocks/accountMocks';

vi.mock('../../../src/models', () => ({
  Account: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('AccountsRepository', () => {
  let accountsRepository: AccountsRepository;
  beforeEach(() => {
    vi.clearAllMocks();
    accountsRepository = new AccountsRepository();
  });

  it('should return all accounts in ascending order', async () => {
    (Account.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockAccountDocument,
          { ...mockAccountDocument, _id: 'other' },
        ]),
    });

    const result = await accountsRepository.findAll('asc');
    expect(Account.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockAccountDocument,
      { ...mockAccountDocument, _id: 'other' },
    ]);
  });

  it('should return all accounts in descending order', async () => {
    (Account.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockAccountDocument, _id: 'other' },
          mockAccountDocument,
        ]),
    });

    const result = await accountsRepository.findAll('desc');
    expect(Account.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockAccountDocument, _id: 'other' },
      mockAccountDocument,
    ]);
  });

  it('should find an account by filter', async () => {
    (Account.findOne as any).mockResolvedValueOnce(mockAccountDocument);

    const result = await accountsRepository.find({
      _id: mockAccountDocument._id,
    });

    expect(Account.findOne).toHaveBeenCalledWith({
      _id: mockAccountDocument._id,
    });

    expect(result).toEqual(mockAccountDocument);
  });

  it('should create a new account', async () => {
    (Account.create as any).mockResolvedValueOnce(mockAccountDocument);
    const result = await accountsRepository.create(mockCreateAccountDTO);
    expect(Account.create).toHaveBeenCalledWith(mockCreateAccountDTO);
    expect(result).toEqual(mockAccountDocument);
  });

  it('should update an existing account', async () => {
    (Account.findOneAndUpdate as any).mockResolvedValueOnce(
      mockAccountDocument
    );

    const result = await accountsRepository.update(
      { _id: mockAccountDocument._id },
      mockUpdateAccountDTO
    );

    expect(Account.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockAccountDocument._id },
      mockUpdateAccountDTO,
      { new: true }
    );

    expect(result).toEqual(mockAccountDocument);
  });

  it('should delete an account by filter', async () => {
    (Account.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await accountsRepository.delete({ _id: mockAccountDocument._id });

    expect(Account.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockAccountDocument._id,
    });
  });
});
