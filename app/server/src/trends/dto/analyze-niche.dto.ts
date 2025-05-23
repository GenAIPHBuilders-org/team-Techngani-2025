import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeNicheDto {
  @IsNotEmpty()
  @IsString()
  niche: string;
}
