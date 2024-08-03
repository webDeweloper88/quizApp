import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @ApiOperation({ summary: 'Submit quiz results' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createResult(@Body() createResultDto: CreateResultDTO, @Req() req) {
    const userId = req.user.userId;
    return this.resultService.createResult(userId, createResultDto);
  }

  @ApiOperation({ summary: 'Get result by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getResultById(@Param('id') id: number) {
    return this.resultService.getResultById(id);
  }
}
