import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GenerateReportDto {
  @IsNotEmpty()
  @IsString()
  niche: string;

  @IsNotEmpty()
  @IsNumber()
  selectedIndex: number;
}
