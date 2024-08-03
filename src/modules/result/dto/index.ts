// // src/result/dto/create-result.dto.ts
// import { ApiProperty } from '@nestjs/swagger';
// import { IsInt, IsBoolean, IsOptional } from 'class-validator';

// export class CreateResultDTO {
//   @ApiProperty()
//   @IsInt()
//   readonly userId: number;

//   @ApiProperty()
//   @IsInt()
//   readonly quizId: number;

//   @ApiProperty()
//   @IsInt()
//   readonly score: number;

//   @ApiProperty()
//   @IsBoolean()
//   readonly passed: boolean;
// }

// export class UpdateResultDTO {
//   @ApiProperty()
//   @IsOptional()
//   @IsInt()
//   readonly userId?: number;

//   @ApiProperty()
//   @IsOptional()
//   @IsInt()
//   readonly quizId?: number;

//   @ApiProperty()
//   @IsOptional()
//   @IsInt()
//   readonly score?: number;

//   @ApiProperty()
//   @IsOptional()
//   @IsBoolean()
//   readonly passed?: boolean;
// }

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
