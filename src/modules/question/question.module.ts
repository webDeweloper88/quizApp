// src/question/question.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [SequelizeModule],
})
export class QuestionModule {}
