// src/quiz/quiz.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './quiz.model';
import { QuizzesService } from './quizzes.service';
import { QuizController } from './quizzes.controller';

@Module({
  imports: [SequelizeModule.forFeature([Quiz])],
  providers: [QuizzesService],
  controllers: [QuizController],
  exports: [SequelizeModule],
})
export class QuizModule {}
