/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Exam } from '../../../src/models';
import { ExamsRepository } from '../../../src/repositories/ExamsRepository';

import {
  mockCreateExamDTO,
  mockExamDocument,
  mockUpdateExamDTO,
} from '../../mocks/examMocks';

vi.mock('../../../src/models', () => ({
  Exam: {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe('ExamsRepository', () => {
  let examsRepository: ExamsRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    examsRepository = new ExamsRepository();
  });

  it('should retrieve all exams in descending order', async () => {
    (Exam.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          { ...mockExamDocument, _id: 'other' },
          mockExamDocument,
        ]),
    });

    const result = await examsRepository.findAll('desc');
    expect(Exam.find).toHaveBeenCalled();

    expect(result).toEqual([
      { ...mockExamDocument, _id: 'other' },
      mockExamDocument,
    ]);
  });

  it('should retrieve all exams in ascending order', async () => {
    (Exam.find as any).mockReturnValueOnce({
      sort: vi
        .fn()
        .mockResolvedValueOnce([
          mockExamDocument,
          { ...mockExamDocument, _id: 'other' },
        ]),
    });

    const result = await examsRepository.findAll('asc');
    expect(Exam.find).toHaveBeenCalled();

    expect(result).toEqual([
      mockExamDocument,
      { ...mockExamDocument, _id: 'other' },
    ]);
  });

  it('should find an exam by filter', async () => {
    (Exam.findOne as any).mockResolvedValueOnce(mockExamDocument);

    const result = await examsRepository.find({ _id: mockExamDocument._id });

    expect(Exam.findOne).toHaveBeenCalledWith({ _id: mockExamDocument._id });
    expect(result).toEqual(mockExamDocument);
  });

  it('should create a new exam', async () => {
    (Exam.create as any).mockResolvedValueOnce(mockExamDocument);
    const result = await examsRepository.create(mockCreateExamDTO);
    expect(Exam.create).toHaveBeenCalledWith(mockCreateExamDTO);
    expect(result).toEqual(mockExamDocument);
  });

  it('should update an existing exam', async () => {
    (Exam.findOneAndUpdate as any).mockResolvedValueOnce(mockExamDocument);

    const result = await examsRepository.update(
      { _id: mockExamDocument._id },
      mockUpdateExamDTO
    );

    expect(Exam.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockExamDocument._id },
      mockUpdateExamDTO,
      { new: true }
    );
    expect(result).toEqual(mockExamDocument);
  });

  it('should delete an exam by filter', async () => {
    (Exam.findOneAndDelete as any).mockResolvedValueOnce(undefined);
    await examsRepository.delete({ _id: mockExamDocument._id });

    expect(Exam.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockExamDocument._id,
    });
  });
});
