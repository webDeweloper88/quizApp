// src/question/dto/create-question.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateQuestionDTO {
  @ApiProperty()
  @IsInt()
  readonly quizId: number;

  @ApiProperty()
  @IsString()
  readonly questionText: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly image?: string;
}

export class UpdateQuestionDTO {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly quizId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly questionText?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly image?: string;
}
