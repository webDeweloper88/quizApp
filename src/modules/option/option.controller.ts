// src/option/option.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDTO, UpdateOptionDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Option } from './option.model';

@ApiTags('options')
@ApiBearerAuth()
@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @ApiOperation({ summary: 'Create a new option' })
  @ApiResponse({
    status: 201,
    description: 'Option created successfully',
    type: Option,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOptionDto: CreateOptionDTO) {
    return this.optionService.createOption(createOptionDto);
  }

  @ApiOperation({ summary: 'Get all options' })
  @ApiResponse({
    status: 200,
    description: 'Options retrieved successfully',
    type: [Option],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.optionService.findAllOptions();
  }

  @ApiOperation({ summary: 'Get an option by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Option ID' })
  @ApiResponse({
    status: 200,
    description: 'Option retrieved successfully',
    type: Option,
  })
  @ApiResponse({ status: 404, description: 'Option not found' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.optionService.findOptionById(id);
  }

  @ApiOperation({ summary: 'Update an option by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Option ID' })
  @ApiResponse({
    status: 200,
    description: 'Option updated successfully',
    type: Option,
  })
  @ApiResponse({ status: 404, description: 'Option not found' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOptionDto: UpdateOptionDTO,
  ) {
    return this.optionService.updateOption(id, updateOptionDto);
  }

  @ApiOperation({ summary: 'Delete an option by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Option ID' })
  @ApiResponse({ status: 204, description: 'Option deleted successfully' })
  @ApiResponse({ status: 404, description: 'Option not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.optionService.deleteOption(id);
  }
}
