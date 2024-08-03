// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO, LoginUserDTO } from '../user/dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService
      .findUserByEmail(dto.email)
      .catch(() => null);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);

    const existUsername = await this.userService
      .findUserByUsername(dto.username)
      .catch(() => null);
    if (existUsername) throw new BadRequestException(AppError.USERNAME_EXIST);

    return this.userService.createUser(dto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService
      .findUserByEmail(email)
      .catch(() => null);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(dto: LoginUserDTO) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
