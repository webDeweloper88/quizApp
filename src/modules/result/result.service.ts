import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Result } from './result.model';
import { CreateResultDTO } from './dto';
import { Quiz } from '../quizzes/quiz.model';
import { Question } from '../question/question.model';
import { Option } from '../option/option.model';
import { User } from '../user/models/user.model';
import { PdfService } from '../pdf/pdf.service';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result) private readonly resultModel: typeof Result,
    @InjectModel(Quiz) private readonly quizModel: typeof Quiz,
    @InjectModel(Question) private readonly questionModel: typeof Question,
    @InjectModel(Option) private readonly optionModel: typeof Option,
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly pdfService: PdfService,
  ) {}

  async createResult(userId: number, dto: CreateResultDTO): Promise<any> {
    const { quizId, answers } = dto;

    const quiz = await this.quizModel.findByPk(quizId, {
      include: [{ model: Question, include: [Option] }],
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    let score = 0;
    const answeredQuestions = new Set();
    const detailedResults = [];

    for (const answer of answers) {
      if (answeredQuestions.has(answer.questionId)) {
        continue;
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
      const isCorrect = selectedOption?.isCorrect || false;
      const correctOption = question.options.find((o) => o.isCorrect);

      if (isCorrect) {
        score += 1;
      }

      detailedResults.push({
        questionText: question.questionText,
        options: question.options.map((opt) => ({
          text: opt.optionText,
          isCorrect: opt.isCorrect,
          isSelected: opt.id === answer.optionId,
        })),
        selectedOption: selectedOption?.optionText || null,
        correctOption: correctOption?.optionText || null,
        isCorrect,
        pointsAwarded: isCorrect ? 1 : 0,
        maxPoints: 1,
      });

      answeredQuestions.add(answer.questionId);
    }

    const maxScore = quiz.questions.length;
    const percentage = (score / maxScore) * 100;
    const passed = percentage >= 70;

    const result = await this.resultModel.create({
      userId,
      quizId,
      score: percentage,
      passed,
    });

    const user = await this.userModel.findByPk(userId);
    const resultData = {
      user: user.username,
      quiz: quiz.title,
      detailedResults,
      totalPoints: score,
      maxPoints: maxScore,
      percentage,
      passed,
      comment: passed
        ? 'Congratulations! You passed the test.'
        : 'You need to improve your knowledge.',
      resultId: result.id,
      completedAt: result.createdAt,
    };

    return resultData;
  }

  async getResultById(id: number): Promise<any> {
    const result = await this.resultModel.findByPk(id, {
      include: [
        {
          model: Quiz,
          include: [{ model: Question, include: [Option] }],
        },
        {
          model: User,
        },
      ],
    });

    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }

    const detailedResults = await this.generateDetailedResults(
      result.quiz,
      result.answers,
    );

    const resultData = {
      ...result.dataValues,
      user: result.user.username,
      quiz: result.quiz.title,
      detailedResults,
      totalPoints: result.score, // Использование result.score
      maxPoints: result.quiz.questions.length, // Использование result.quiz.questions.length
      percentage: result.score, // Уже рассчитано как процент
      passed: result.passed,
      // comment: result.passed
      //   ? 'Congratulations! You passed the test.'
      //   : 'You need to improve your knowledge.',
    };

    return resultData;
  }

  async getResultsByUser(userId: number): Promise<Result[]> {
    return this.resultModel.findAll({
      where: { userId },
      include: [Quiz],
    });
  }

  async generateDetailedResults(quiz: Quiz, answers: any[]): Promise<any[]> {
    let detailedResults = [];

    for (const answer of answers) {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${answer.questionId} not found`,
        );
      }

      const selectedOption = question.options.find(
        (o) => o.id === answer.optionId,
      );
      const isCorrect = selectedOption?.isCorrect || false;
      const correctOption = question.options.find((o) => o.isCorrect);

      detailedResults.push({
        questionText: question.questionText,
        options: question.options.map((opt) => ({
          text: opt.optionText,
          isCorrect: opt.isCorrect,
          isSelected: opt.id === answer.optionId,
        })),
        selectedOption: selectedOption?.optionText || null,
        correctOption: correctOption?.optionText || null,
        isCorrect,
        pointsAwarded: isCorrect ? 1 : 0,
        maxPoints: 1,
      });
    }

    return detailedResults;
  }

  async generatePdf(resultId: number): Promise<Buffer> {
    const result = await this.getResultById(resultId);
    return this.pdfService.generateResultPdf(result);
  }
}
