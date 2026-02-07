import { IsInt, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { ResultMode } from '@prisma/client';

export class CreateResultDto {
    @IsInt()
    @Min(0)
    wpm: number;
  
    @IsNumber()
    @Min(0)
    @Max(1)
    accuracy: number;
  
    @IsInt()
    @Min(0)
    correctCount: number;
  
    @IsInt()
    @Min(1)
    totalCount: number;
  
    @IsInt()
    @Min(1)
    durationSec: number;
  
    @IsEnum(ResultMode)
    mode: ResultMode;
  }