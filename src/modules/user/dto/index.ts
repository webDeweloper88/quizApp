// src/user/dto/index.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator';
import { User, UserRole } from '../models/user.model';

export class CreateUserDTO {
  // @ApiProperty()
  // @IsString()
  // readonly username: string;

  // @ApiProperty()
  // @IsEmail()
  // readonly email: string;

  // @ApiProperty()
  // @IsString()
  // @MinLength(8)
  // readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, {
    message: 'Password must contain letters and numbers',
  })
  password: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly password?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}

// src/user/dto/login-user.dto.ts

export class LoginUserDTO {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}

export class LoginResponseDTO {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty()
  access_token: string;
}
