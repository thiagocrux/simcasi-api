import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CreateSessionUseCase } from '../../../../src/useCases';
import * as dateTime from '../../../../src/utils/dateTime';

import {
  generateSessionTimeframe,
  InvalidCredentialsError,
  SessionCreationError,
} from '../../../../src/utils';

import { CreateSessionSchema } from '../../../../src/schemas';
import {
  mockAccountDocument,
  mockAccountsRepository,
  mockCreateSessionDTO,
  mockDeviceInfo,
  mockJwtToken,
  mockSessionDocument,
  mockSessionsRepository,
} from '../../../mocks';

describe('CreateSessionUseCase.ts', async () => {
  const useCase = new CreateSessionUseCase(
    mockSessionsRepository,
    mockAccountsRepository
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  mockAccountsRepository.find.mockResolvedValue(mockAccountDocument);
  mockSessionsRepository.create.mockResolvedValue(mockSessionDocument);

  vi.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
  vi.spyOn(jwt, 'sign').mockImplementation(() => mockJwtToken);

  it('should validate input and throw error when data is invalid', async () => {
    const validationSpy = vi.spyOn(CreateSessionSchema, 'parse');

    await expect(
      // @ts-expect-error: deliberate wrong param type for testing purposes
      useCase.execute({ ...mockCreateSessionDTO, password: 0 }, mockDeviceInfo)
    ).rejects.toThrow();

    expect(validationSpy).toBeCalled();
  });

  it('should find the account associated to the session', async () => {
    await useCase.execute(mockCreateSessionDTO, mockDeviceInfo);
    expect(mockAccountsRepository.find).toBeCalled();
  });

  it('should successfully compare passwords using bcrypt', async () => {
    await useCase.execute(mockCreateSessionDTO, mockDeviceInfo);
    expect(bcrypt.compare).toBeCalled();
  });

  it("should throw InvalidCredentialsError when account can't be found", async () => {
    mockAccountsRepository.find.mockResolvedValueOnce(null);

    await expect(
      useCase.execute(mockCreateSessionDTO, mockDeviceInfo)
    ).rejects.toThrow(InvalidCredentialsError);

    expect(mockAccountsRepository.find).toBeCalled();
  });

  it("should throw InvalidCredentialsError when credentials don't match", async () => {
    vi.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);

    await expect(
      useCase.execute(mockCreateSessionDTO, mockDeviceInfo)
    ).rejects.toThrow(InvalidCredentialsError);

    expect(mockAccountsRepository.find).toBeCalled();
  });

  it('should throw SessionCreationError when generateSessionTimeframe returns null', async () => {
    vi.spyOn(dateTime, 'generateSessionTimeframe').mockImplementationOnce(
      () => null
    );

    await expect(
      useCase.execute(mockCreateSessionDTO, mockDeviceInfo)
    ).rejects.toThrow(SessionCreationError);

    expect(generateSessionTimeframe).toBeCalled();
  });

  it('should create a new session after passing the validations', async () => {
    const useCaseReturn = await useCase.execute(
      mockCreateSessionDTO,
      mockDeviceInfo
    );

    expect(mockAccountsRepository.find).toBeCalled();
    expect(mockSessionsRepository.create).toBeCalled();

    expect(useCaseReturn).toStrictEqual({
      accessToken: mockJwtToken,
      session: mockSessionDocument._id,
    });
  });
});
