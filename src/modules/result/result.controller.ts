import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { PdfService } from '../pdf/pdf.service';

@ApiTags('results')
@Controller('results')
export class ResultController {
  constructor(
    private readonly resultService: ResultService,
    private readonly pdfService: PdfService, // Инъекция PdfService
  ) {}

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

  @ApiOperation({ summary: 'Get results by user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getResultsByUser(@Req() req) {
    const userId = req.user.userId;
    return this.resultService.getResultsByUser(userId);
  }

  @ApiOperation({ summary: 'Download PDF result by ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id/pdf')
  async downloadResultPdf(@Param('id') id: number, @Res() res: Response) {
    const pdfBuffer = await this.resultService.generatePdf(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  }
}
