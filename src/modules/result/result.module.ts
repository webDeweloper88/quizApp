// src/result/result.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Result } from './result.model';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { QuizModule } from '../quizzes/quizzes.module';
import { QuestionModule } from '../question/question.module';
import { OptionModule } from '../option/option.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Result]),
    QuizModule, // Импортируйте QuizModule
    QuestionModule, // Импортируйте QuestionModule
    OptionModule, // Импортируйте OptionModule
  ],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
