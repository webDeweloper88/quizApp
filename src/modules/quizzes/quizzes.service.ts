// src/quiz/quiz.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { CreateQuizDTO, UpdateQuizDTO } from './dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz)
    private quizModel: typeof Quiz,
  ) {}

  async createQuiz(dto: CreateQuizDTO): Promise<Quiz> {
    return this.quizModel.create(dto);
  }

  async findAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.findAll();
  }

  async findQuizById(id: number): Promise<Quiz> {
    const quiz = await this.quizModel.findByPk(id);
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async updateQuiz(id: number, updateQuizDto: UpdateQuizDTO): Promise<Quiz> {
    const quiz = await this.findQuizById(id);
    await quiz.update(updateQuizDto);
    return quiz;
  }

  async deleteQuiz(id: number): Promise<void> {
    const quiz = await this.findQuizById(id);
    await quiz.destroy();
  }
}
