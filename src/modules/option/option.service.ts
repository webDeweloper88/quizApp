// src/option/option.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Option } from './option.model';
import { CreateOptionDTO, UpdateOptionDTO } from './dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option)
    private optionModel: typeof Option,
  ) {}

  async createOption(dto: CreateOptionDTO): Promise<Option> {
    return this.optionModel.create(dto);
  }

  async findAllOptions(): Promise<Option[]> {
    return this.optionModel.findAll();
  }

  async findOptionById(id: number): Promise<Option> {
    const option = await this.optionModel.findByPk(id);
    if (!option) {
      throw new NotFoundException(`Option with ID ${id} not found`);
    }
    return option;
  }

  async updateOption(
    id: number,
    updateOptionDto: UpdateOptionDTO,
  ): Promise<Option> {
    const option = await this.findOptionById(id);
    await option.update(updateOptionDto);
    return option;
  }

  async deleteOption(id: number): Promise<void> {
    const option = await this.findOptionById(id);
    await option.destroy();
  }
}
