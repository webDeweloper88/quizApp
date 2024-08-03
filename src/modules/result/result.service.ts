import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Result } from './result.model';
import { CreateResultDTO } from './dto';
import { Quiz } from '../quizzes/quiz.model';
import { Question } from '../question/question.model';
import { Option } from '../option/option.model';
import { User } from '../user/models/user.model'; // Импорт модели User

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result) private readonly resultModel: typeof Result,
    @InjectModel(Quiz) private readonly quizModel: typeof Quiz,
    @InjectModel(Question) private readonly questionModel: typeof Question,
    @InjectModel(Option) private readonly optionModel: typeof Option,
    @InjectModel(User) private readonly userModel: typeof User, // Инъекция модели User
  ) {}

  async createResult(userId: number, dto: CreateResultDTO): Promise<Result> {
    const { quizId, answers } = dto;

    // Найдите викторину
    const quiz = await this.quizModel.findByPk(quizId, {
      include: [{ model: Question, include: [Option] }],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    let score = 0;
    const answeredQuestions = new Set();

    // Рассчитайте баллы
    for (const answer of answers) {
      if (answeredQuestions.has(answer.questionId)) {
        continue; // Игнорируйте повторяющиеся ответы на тот же вопрос
      }
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${answer.questionId} not found`,
        );
      }
      const selectedOption = question.options.find(
        (o) => o.id === answer.optionId,
      );
      if (selectedOption && selectedOption.isCorrect) {
        score += 1;
      }
      answeredQuestions.add(answer.questionId);
    }

    // Максимальный балл за викторину
    const maxScore = quiz.questions.length;
    // Процент правильных ответов
    const percentage = (score / maxScore) * 100;
    // Прошел ли пользователь тест (минимум 70%)
    const passed = percentage >= 70;

    // Создайте запись результата
    const result = await this.resultModel.create({
      userId,
      quizId,
      score: percentage,
      passed,
    });

    return result;
  }

  async getResultById(id: number): Promise<Result> {
    const result = await this.resultModel.findByPk(id, {
      include: [Quiz, User],
    });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }
}
