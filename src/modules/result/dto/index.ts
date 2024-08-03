import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDTO {
  @ApiProperty()
  @IsInt()
  questionId: number;

  @ApiProperty()
  @IsInt()
  optionId: number;
}

export class CreateResultDTO {
  @ApiProperty()
  @IsInt()
  quizId: number;

  @ApiProperty({ type: [AnswerDTO] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  answers: AnswerDTO[];
}
