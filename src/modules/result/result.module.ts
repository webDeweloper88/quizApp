import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Result } from './result.model';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { Quiz } from '../quizzes/quiz.model';
import { Question } from '../question/question.model';
import { Option } from '../option/option.model';
import { UserModule } from '../user/user.module';
import { PdfService } from '../pdf/pdf.service'; // Импорт PdfService

@Module({
  imports: [
    SequelizeModule.forFeature([Result, Quiz, Question, Option]),
    UserModule,
  ],
  providers: [ResultService, PdfService], // Добавление PdfService в провайдеры
  controllers: [ResultController],
})
export class ResultModule {}
