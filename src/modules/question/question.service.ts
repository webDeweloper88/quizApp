// src/question/question.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './question.model';
import { CreateQuestionDTO, UpdateQuestionDTO } from './dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
  ) {}

  async createQuestion(dto: CreateQuestionDTO): Promise<Question> {
    return this.questionModel.create(dto);
  }

  async findAllQuestions(): Promise<Question[]> {
    return this.questionModel.findAll();
  }

  async findQuestionById(id: number): Promise<Question> {
    const question = await this.questionModel.findByPk(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async updateQuestion(
    id: number,
    updateQuestionDto: UpdateQuestionDTO,
  ): Promise<Question> {
    const question = await this.findQuestionById(id);
    await question.update(updateQuestionDto);
    return question;
  }

  async deleteQuestion(id: number): Promise<void> {
    const question = await this.findQuestionById(id);
    await question.destroy();
  }
}
