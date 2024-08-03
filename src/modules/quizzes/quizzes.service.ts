import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { CreateQuizDTO } from './dto';
import { Question } from '../question/question.model';
import { Option } from '../option/option.model';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz)
    private quizModel: typeof Quiz,
  ) {}

  async createQuiz(
    createQuizDto: CreateQuizDTO,
    userId: number,
  ): Promise<Quiz> {
    const quiz = await this.quizModel.create({
      ...createQuizDto,
      createdBy: userId,
    });
    return quiz;
  }

  async findAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.findAll({
      include: {
        model: Question,
        include: [Option],
      },
    });
  }

  async findQuizById(id: number): Promise<Quiz> {
    return this.quizModel.findByPk(id, {
      include: {
        model: Question,
        include: [Option],
      },
    });
  }
}
