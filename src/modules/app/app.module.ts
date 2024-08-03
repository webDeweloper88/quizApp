import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations';
import { User } from './../user/models/user.model';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { QuizModule } from './../quizzes/quizzes.module';
import { QuestionModule } from './../question/question.module';
import { ResultModule } from './../result/result.module';
import { OptionModule } from './../option/option.module';
import { Quiz } from './../quizzes/quiz.model';
import { Question } from './../question/question.model';
import { Result } from './../result/result.model';
import { Option } from './../option/option.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('db_host'),
        port: configService.get<number>('db_port'),
        username: configService.get<string>('db_user'),
        password: configService.get<string>('db_password'),
        database: configService.get<string>('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Quiz, Question, Option, Result],
      }),
    }),
    UserModule,
    AuthModule,
    QuizModule,
    QuestionModule,
    OptionModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
