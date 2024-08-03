// src/question/question.controller.ts
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
import { QuestionService } from './question.service';
import { CreateQuestionDTO, UpdateQuestionDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Question } from './question.model';

@ApiTags('questions')
@ApiBearerAuth()
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: Question,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDTO) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'Questions retrieved successfully',
    type: [Question],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.questionService.findAllQuestions();
  }

  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved successfully',
    type: Question,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.questionService.findQuestionById(id);
  }

  @ApiOperation({ summary: 'Update a question by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: Question,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDTO,
  ) {
    return this.questionService.updateQuestion(id, updateQuestionDto);
  }

  @ApiOperation({ summary: 'Delete a question by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Question ID' })
  @ApiResponse({ status: 204, description: 'Question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.questionService.deleteQuestion(id);
  }
}
