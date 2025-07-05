/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Observation } from '../../../src/models';
import { ObservationsRepository } from '../../../src/repositories/ObservationsRepository';

import {
  mockCreateObservationDTO,
  mockObservationDocument,
  mockUpdateObservationDTO,
} from '../../mocks/observationMocks';

vi.mock('../../../src/models', () => ({
  Observation: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('ObservationsRepository', () => {
  let observationsRepository: ObservationsRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    observationsRepository = new ObservationsRepository();
  });

  it('should return all observations in descending order', async () => {
    (Observation.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockObservationDocument, _id: 'other' },
          mockObservationDocument,
        ]),
    });

    const result = await observationsRepository.findAll('desc');
    expect(Observation.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockObservationDocument, _id: 'other' },
      mockObservationDocument,
    ]);
  });

  it('should return all observations in ascending order', async () => {
    (Observation.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockObservationDocument,
          { ...mockObservationDocument, _id: 'other' },
        ]),
    });

    const result = await observationsRepository.findAll('asc');
    expect(Observation.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockObservationDocument,
      { ...mockObservationDocument, _id: 'other' },
    ]);
  });

  it('should find an observation by filter', async () => {
    (Observation.findOne as any).mockResolvedValueOnce(mockObservationDocument);

    const result = await observationsRepository.find({
      _id: mockObservationDocument._id,
    });

    expect(Observation.findOne).toHaveBeenCalledWith({
      _id: mockObservationDocument._id,
    });
    expect(result).toEqual(mockObservationDocument);
  });

  it('should create a new observation', async () => {
    (Observation.create as any).mockResolvedValueOnce(mockObservationDocument);

    const result = await observationsRepository.create(
      mockCreateObservationDTO
    );

    expect(Observation.create).toHaveBeenCalledWith(mockCreateObservationDTO);
    expect(result).toEqual(mockObservationDocument);
  });

  it('should update an existing observation', async () => {
    (Observation.findOneAndUpdate as any).mockResolvedValueOnce(
      mockObservationDocument
    );

    const result = await observationsRepository.update(
      { _id: mockObservationDocument._id },
      mockUpdateObservationDTO
    );

    expect(Observation.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockObservationDocument._id },
      mockUpdateObservationDTO,
      { new: true }
    );

    expect(result).toEqual(mockObservationDocument);
  });

  it('should delete an observation by filter', async () => {
    (Observation.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await observationsRepository.delete({ _id: mockObservationDocument._id });

    expect(Observation.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockObservationDocument._id,
    });
  });
});
