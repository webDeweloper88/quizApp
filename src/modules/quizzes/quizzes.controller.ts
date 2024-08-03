import { QuizzesService } from './quizzes.service';
// src/quiz/quiz.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { CreateQuizDTO, UpdateQuizDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Quiz } from './quiz.model';

@ApiTags('quizzes')
@ApiBearerAuth()
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizzesService) {}

  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({
    status: 201,
    description: 'Quiz created successfully',
    type: Quiz,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createQuizDto: CreateQuizDTO) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({
    status: 200,
    description: 'Quizzes retrieved successfully',
    type: [Quiz],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.quizService.findAllQuizzes();
  }

  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz retrieved successfully',
    type: Quiz,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.quizService.findQuizById(id);
  }

  @ApiOperation({ summary: 'Update a quiz by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Quiz ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz updated successfully',
    type: Quiz,
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateQuizDto: UpdateQuizDTO) {
    return this.quizService.updateQuiz(id, updateQuizDto);
  }

  @ApiOperation({ summary: 'Delete a quiz by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Quiz ID' })
  @ApiResponse({ status: 204, description: 'Quiz deleted successfully' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.quizService.deleteQuiz(id);
  }
}
