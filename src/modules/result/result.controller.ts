import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('results')
@ApiBearerAuth()
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @ApiOperation({ summary: 'Get result by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getResultById(@Param('id') id: number) {
    return this.resultService.getResultById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createResult(@Req() req, @Body() dto: CreateResultDTO) {
    const userId = req.user.userId; // Получите ID пользователя из токена
    return this.resultService.createResult(userId, dto);
  }
}
