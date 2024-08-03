// src/user/user.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from './models/user.model';
import { CreateUserDTO, UpdateUserDTO } from './dto/index';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    const { password, ...userData } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      ...userData,
      password: hashedPassword,
      role: UserRole.USER,
    });
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDTO): Promise<User> {
    const user = await this.findUserById(id);
    const updatedData = { ...updateUserDto };

    if (updateUserDto.password) {
      updatedData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update(updatedData);
    return user;
  }

  async updateUserRole(id: number, role: UserRole): Promise<User> {
    const user = await this.findUserById(id);
    user.role = role;
    await user.save();
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    await user.destroy();
  }
}
