import jwt from 'jsonwebtoken';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GenerateNewAccessTokenUseCase } from '../../../../src/useCases';
import { ExpiredSessionError, NotFoundError } from '../../../../src/utils';

import {
  mockAccountDocument,
  mockAccountsRepository,
  mockJwtToken,
  mockSessionDocument,
  mockSessionsRepository,
} from '../../../mocks';

describe('GenerateNewAccessTokenUseCase', () => {
  const useCase = new GenerateNewAccessTokenUseCase(
    mockSessionsRepository,
    mockAccountsRepository
  );

  mockSessionsRepository.find.mockResolvedValue(mockSessionDocument);
  mockAccountsRepository.find.mockResolvedValue(mockAccountDocument);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('jwt', () => ({
    sign: vi.fn(),
  }));

  vi.mock('../../config', () => ({
    env: {
      jwtSecret: 'test-secret',
    },
    JWT_DURATION: '1h',
  }));

  it('should throw NotFoundError if account is not found', async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute(mockSessionDocument._id)).rejects.toThrow(
      NotFoundError
    );
  });

  it('should throw NotFoundError if session is not found', async () => {
    mockSessionsRepository.find.mockResolvedValueOnce(null);

    await expect(useCase.execute('non-existent-session-id')).rejects.toThrow(
      NotFoundError
    );
  });

  it('should throw ExpiredSessionError if session has expired', async () => {
    mockSessionsRepository.find.mockResolvedValueOnce({
      ...mockSessionDocument,
      expiresAt: new Date(Date.now() - 360000),
    });

    await expect(useCase.execute('expired-session-id')).rejects.toThrow(
      ExpiredSessionError
    );

    expect(mockSessionsRepository.update).toHaveBeenCalledWith(
      { _id: 'expired-session-id' },
      { isActive: false }
    );
  });

  it('should throw ExpiredSessionError if session is not active', async () => {
    mockSessionsRepository.find.mockResolvedValueOnce({
      ...mockSessionDocument,
      isActive: false,
    });

    await expect(useCase.execute('inactive-session-id')).rejects.toThrow(
      ExpiredSessionError
    );
  });

  it('should propagate errors from jwt.sign', async () => {
    vi.spyOn(jwt, 'sign').mockRejectedValue(new Error('JWT error'));

    await expect(
      useCase.execute(mockSessionDocument.accountId)
    ).rejects.toThrow('JWT error');
  });

  it('should generate a new access token for a valid session', async () => {
    vi.spyOn(jwt, 'sign').mockImplementation(() => mockJwtToken);
    const result = await useCase.execute(mockSessionDocument.accountId);

    expect(mockSessionsRepository.find).toHaveBeenCalledWith({
      _id: mockSessionDocument.accountId,
    });

    expect(mockAccountsRepository.find).toHaveBeenCalledWith({
      _id: mockSessionDocument.accountId,
    });

    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toBe(mockJwtToken);
  });
});
