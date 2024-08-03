import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRole } from '../user/models/user.model';
import { Quiz } from './quiz.model';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createQuiz(
    @Body() createQuizDto: CreateQuizDTO,
    @Req() req,
  ): Promise<Quiz> {
    const userId = req.user.userId; // Извлечение userId из токена
    return this.quizzesService.createQuiz(createQuizDto, userId);
  }

  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findQuizById(@Param('id') id: number) {
    return this.quizzesService.findQuizById(id);
  }

  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllQuizzes() {
    return this.quizzesService.findAllQuizzes();
  }
}
