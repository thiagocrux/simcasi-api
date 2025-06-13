import { CreateExamDTO, ExamFilter, UpdateExamDTO } from '../..';
import { ExamDocument } from '../../../models';

export interface ExamsRepository {
  findAll(order: 'asc' | 'desc'): Promise<ExamDocument[]>;
  find(filter: ExamFilter): Promise<ExamDocument | null>;
  create(body: CreateExamDTO): Promise<ExamDocument>;
  update(filter: ExamFilter, body: UpdateExamDTO): Promise<ExamDocument | null>;
  delete(filter: ExamFilter): Promise<void>;
}
