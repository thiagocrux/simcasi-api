import { Exam } from '../models';
import { CreateExamDTO, ExamFilter, UpdateExamDTO } from '../types';

class ExamsRepository {
  public async findAll(order: 'asc' | 'desc') {
    const exams = await Exam.find().sort({
      updatedAt: order === 'desc' ? -1 : 1,
    });

    return exams;
  }

  public async find(filter: ExamFilter) {
    const exam = await Exam.findOne(filter);
    return exam;
  }

  public async create(body: CreateExamDTO) {
    const exam = await Exam.create(body);
    return exam;
  }

  public async update(filter: ExamFilter, body: UpdateExamDTO) {
    const exam = await Exam.findOneAndUpdate(filter, body, {
      new: true,
    });

    return exam;
  }

  public async delete(filter: ExamFilter) {
    await Exam.findOneAndDelete(filter);
  }
}

export default new ExamsRepository();
