// src/quiz/dto/index.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateQuizDTO {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsInt()
  readonly createdBy: number;
}

export class UpdateQuizDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly createdBy?: number;
}
