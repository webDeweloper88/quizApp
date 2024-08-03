// src/option/dto/create-option.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateOptionDTO {
  @ApiProperty()
  @IsInt()
  readonly questionId: number;

  @ApiProperty()
  @IsString()
  readonly optionText: string;

  @ApiProperty()
  @IsBoolean()
  readonly isCorrect: boolean;
}

// src/option/dto/update-option.dto.ts

export class UpdateOptionDTO {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  readonly questionId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly optionText?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isCorrect?: boolean;
}
