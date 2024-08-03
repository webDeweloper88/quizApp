// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginResponseDTO, LoginUserDTO } from '../user/dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User, UserRole } from '../user/models/user.model';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UserService } from '../user/user.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';

@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiOperation({ summary: 'Update user role' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('role/:id')
  async updateRole(@Param('id') id: number, @Body('role') role: UserRole) {
    return this.userService.updateUserRole(id, role);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginResponseDTO,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @Post('login')
  async login(@Body() dto: LoginUserDTO) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
