/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Session } from '../../../src/models';
import { SessionsRepository } from '../../../src/repositories/SessionsRepository';

import {
  mockCreateSessionDTO,
  mockSessionDocument,
  mockUpdateSessionDTO,
} from '../../mocks/sessionMocks';

vi.mock('../../../src/models', () => ({
  Session: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('SessionsRepository', () => {
  let sessionsRepository: SessionsRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    sessionsRepository = new SessionsRepository();
  });

  it('should retrieve all sessions in descending order', async () => {
    (Session.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockSessionDocument, _id: 'other' },
          mockSessionDocument,
        ]),
    });

    const result = await sessionsRepository.findAll('desc');
    expect(Session.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockSessionDocument, _id: 'other' },
      mockSessionDocument,
    ]);
  });

  it('should retrieve all sessions in ascending order', async () => {
    (Session.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockSessionDocument,
          { ...mockSessionDocument, _id: 'other' },
        ]),
    });

    const result = await sessionsRepository.findAll('asc');
    expect(Session.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockSessionDocument,
      { ...mockSessionDocument, _id: 'other' },
    ]);
  });

  it('should find a session by filter', async () => {
    (Session.findOne as any).mockResolvedValueOnce(mockSessionDocument);

    const result = await sessionsRepository.find({
      _id: mockSessionDocument._id,
    });

    expect(Session.findOne).toHaveBeenCalledWith({
      _id: mockSessionDocument._id,
    });

    expect(result).toEqual(mockSessionDocument);
  });

  it('should create a new session', async () => {
    (Session.create as any).mockResolvedValueOnce(mockSessionDocument);
    const result = await sessionsRepository.create(mockCreateSessionDTO);
    expect(Session.create).toHaveBeenCalledWith(mockCreateSessionDTO);
    expect(result).toEqual(mockSessionDocument);
  });

  it('should update an existing session', async () => {
    (Session.findOneAndUpdate as any).mockResolvedValueOnce(
      mockSessionDocument
    );

    const result = await sessionsRepository.update(
      { _id: mockSessionDocument._id },
      mockUpdateSessionDTO
    );

    expect(Session.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockSessionDocument._id },
      mockUpdateSessionDTO,
      { new: true }
    );

    expect(result).toEqual(mockSessionDocument);
  });

  it('should delete a session by filter', async () => {
    (Session.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await sessionsRepository.delete({ _id: mockSessionDocument._id });

    expect(Session.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockSessionDocument._id,
    });
  });
});
