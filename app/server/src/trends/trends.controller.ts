import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { AnalyzeNicheDto } from './dto/analyze-niche.dto';
import { GenerateReportDto } from './dto/generate-report.dto';
import { TitleResponse, ReportResponse } from './types/trends.types';
import { ContentOverview } from './types/content.types';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Post('analyze')
  async analyzeTrends(
    @Body() analyzeNicheDto: AnalyzeNicheDto,
  ): Promise<TitleResponse> {
    return this.trendsService.analyzeTrends(analyzeNicheDto.niche);
  }

  @Post('report')
  async generateReport(
    @Body() generateReportDto: GenerateReportDto,
  ): Promise<ReportResponse> {
    return this.trendsService.generateReport(
      generateReportDto.niche,
      generateReportDto.selectedIndex,
    );
  }

  @Get('content')
  async analyzeContent(
    @Query('niche') niche: string,
  ): Promise<ContentOverview> {
    return this.trendsService.analyzeContent(niche);
  }
}
